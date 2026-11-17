import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(ROOT_DIR, "..");

const settingsPath = path.join(ROOT_DIR, "config", "settings.json");
const nichesPath = path.join(ROOT_DIR, "config", "niches.json");
const prospectsPath = path.join(ROOT_DIR, "data", "prospects.json");
const outreachLogPath = path.join(ROOT_DIR, "data", "outreach-log.json");

const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
const nichesData = JSON.parse(fs.readFileSync(nichesPath, "utf-8"));

function loadJson(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.warn(`Could not read ${filePath}:`, e.message);
  }
  return defaultValue;
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function getSessionPath() {
  const primary = path.join(WORKSPACE_ROOT, settings.sessionDir);
  const fallback = path.join(WORKSPACE_ROOT, settings.fallbackSessionDir || ".instagram-session");
  if (fs.existsSync(primary)) return primary;
  if (fs.existsSync(fallback)) return fallback;
  return primary;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function discoverProspects({ targetNiche = null, maxToFind = 8 } = {}) {
  const sessionDir = getSessionPath();
  console.log(`[Discover] Launching Chrome session from: ${sessionDir}`);

  const existingProspects = loadJson(prospectsPath, []);
  const outreachLog = loadJson(outreachLogPath, []);
  const existingUsernames = new Set([
    ...existingProspects.map((p) => p.username.toLowerCase()),
    ...outreachLog.map((o) => o.username.toLowerCase()),
    settings.accountHandle?.toLowerCase()?.replace("@", "") || "",
    "techwith.genz",
    "_crackwithcode"
  ]);

  const nicheKeys = targetNiche ? [targetNiche] : Object.keys(nichesData.niches);
  const found = [];

  const ctx = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    channel: "chrome",
    args: ["--disable-blink-features=AutomationControlled"]
  });

  const page = ctx.pages()[0] || (await ctx.newPage());

  try {
    for (const nicheKey of nicheKeys) {
      if (found.length >= maxToFind) break;
      const niche = nichesData.niches[nicheKey];
      console.log(`\n[Discover] Scanning niche: ${niche.name}`);

      // Pick 2 random tags for this niche
      const tags = niche.tags.sort(() => 0.5 - Math.random()).slice(0, 2);

      for (const tag of tags) {
        if (found.length >= maxToFind) break;
        console.log(`[Discover] Exploring hashtag: #${tag}...`);

        try {
          await page.goto(`https://www.instagram.com/explore/tags/${tag}/`, {
            waitUntil: "domcontentloaded",
            timeout: 25000
          });
          await sleep(3500);

          // Extract post URLs
          const postUrls = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll("a[href*='/p/'], a[href*='/reel/']"));
            return anchors.map((a) => a.getAttribute("href")).filter(Boolean);
          });

          console.log(`[Discover] Found ${postUrls.length} posts for #${tag}`);
          const sampleUrls = postUrls.slice(0, 10);

          for (const postUrl of sampleUrls) {
            if (found.length >= maxToFind) break;

            try {
              // Open post to find author
              await page.goto(`https://www.instagram.com${postUrl}`, {
                waitUntil: "domcontentloaded",
                timeout: 20000
              });
              await sleep(2500);

              const authorUsername = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll("article a[href], main a[href]"))
                  .map((a) => a.getAttribute("href"))
                  .filter(
                    (h) =>
                      h &&
                      h.startsWith("/") &&
                      h.split("/").filter(Boolean).length === 1 &&
                      ![
                        "explore",
                        "direct",
                        "reels",
                        "legal",
                        "popular",
                        "about",
                        "accounts",
                        "p",
                        "reel"
                      ].includes(h.replace(/\//g, ""))
                  );
                return links[0]?.replace(/\//g, "") || null;
              });

              if (!authorUsername || existingUsernames.has(authorUsername.toLowerCase())) {
                continue;
              }

              console.log(`[Discover] Evaluating author: @${authorUsername}`);

              // Visit author profile
              await page.goto(`https://www.instagram.com/${authorUsername}/`, {
                waitUntil: "domcontentloaded",
                timeout: 20000
              });
              await sleep(3000);

              const profileData = await page.evaluate(() => {
                const header = document.querySelector("header");
                if (!header) return null;

                const text = header.innerText || "";
                const buttons = Array.from(document.querySelectorAll("button, div[role='button']")).map((b) =>
                  b.innerText?.trim()
                );
                const hasMessage = buttons.some(
                  (b) => b && (b.toLowerCase() === "message" || b.toLowerCase() === "messages")
                );

                const bioLinks = Array.from(header.querySelectorAll("a[href]"))
                  .map((a) => ({ text: a.innerText, href: a.getAttribute("href") }))
                  .filter((l) => !l.href.includes("followers") && !l.href.includes("following"));

                const isVerified = !!header.querySelector("svg[aria-label*='Verified']");

                // Grab followers
                const followerMatch = text.match(/([\d.,]+[km]?)\s+followers/i);
                const followers = followerMatch ? followerMatch[0] : "";

                // Grab full name (usually second line in header text)
                const lines = text.split("\n").filter((l) => l.trim().length > 0);
                const fullName = lines[1] || "";

                return {
                  text,
                  fullName,
                  followers,
                  hasMessage,
                  isVerified,
                  bioLinks
                };
              });

              if (!profileData || profileData.isVerified || !profileData.hasMessage) {
                existingUsernames.add(authorUsername.toLowerCase());
                continue;
              }

              // Check if they already have an official modern website or app
              const externalLink = profileData.bioLinks.find(
                (l) =>
                  l.href &&
                  l.href.startsWith("http") &&
                  !l.href.includes("instagram.com")
              );

              const hasCustomDomain =
                externalLink &&
                !externalLink.href.includes("facebook.com") &&
                !externalLink.href.includes("wa.me") &&
                !externalLink.href.includes("whatsapp.com") &&
                !externalLink.href.includes("linktr.ee") &&
                !externalLink.href.includes("bit.ly");

              // Add to discovered prospects
              const prospect = {
                username: authorUsername,
                fullName: profileData.fullName || authorUsername,
                bio: profileData.text.slice(0, 300),
                followers: profileData.followers,
                niche: nicheKey,
                hasWebsite: !!hasCustomDomain,
                currentLink: externalLink?.href || null,
                discoveredAt: new Date().toISOString(),
                status: "PENDING"
              };

              found.push(prospect);
              existingProspects.push(prospect);
              existingUsernames.add(authorUsername.toLowerCase());
              saveJson(prospectsPath, existingProspects);

              console.log(
                `✅ [Qualified Lead #${found.length}] @${authorUsername} (${niche.name}) | Link: ${prospect.currentLink || "NONE"}`
              );

              // Safe human delay
              await sleep(4000);
            } catch (err) {
              console.warn(`[Discover] Error inspecting post:`, err.message);
            }
          }
        } catch (err) {
          console.warn(`[Discover] Error exploring tag #${tag}:`, err.message);
        }
      }
    }
  } finally {
    await ctx.close();
  }

  console.log(`\n[Discover] Completed! Found ${found.length} new qualified local business prospects.`);
  return found;
}

// CLI runner
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targetNiche = process.argv.find((a) => a.startsWith("--niche="))?.split("=")[1];
  const max = parseInt(process.argv.find((a) => a.startsWith("--max="))?.split("=")[1] || "5", 10);
  discoverProspects({ targetNiche, maxToFind: max }).then(() => process.exit(0));
}
