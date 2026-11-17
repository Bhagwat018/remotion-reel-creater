import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const scriptPath = path.join(ROOT_DIR, "scripts", "run-daily-outreach.mjs");
const logPath = path.join(ROOT_DIR, "reports", "launchagent.log");

const nodePath = process.execPath;
const plistLabel = "com.antigravity.igclientoutreach";
const plistPath = path.join(os.homedir(), "Library", "LaunchAgents", `${plistLabel}.plist`);

const plistContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${plistLabel}</string>
    <key>ProgramArguments</key>
    <array>
        <string>${nodePath}</string>
        <string>${scriptPath}</string>
        <string>--limit=12</string>
    </array>
    <key>StartCalendarInterval</key>
    <array>
        <!-- Slot 1: 12:30 PM IST -->
        <dict>
            <key>Hour</key>
            <integer>12</integer>
            <key>Minute</key>
            <integer>30</integer>
        </dict>
        <!-- Slot 2: 4:30 PM IST -->
        <dict>
            <key>Hour</key>
            <integer>16</integer>
            <key>Minute</key>
            <integer>30</integer>
        </dict>
    </array>
    <key>StandardOutPath</key>
    <string>${logPath}</string>
    <key>StandardErrorPath</key>
    <string>${logPath}</string>
    <key>WorkingDirectory</key>
    <string>${ROOT_DIR}</string>
</dict>
</plist>`;

export function installAgent() {
  const agentDir = path.join(os.homedir(), "Library", "LaunchAgents");
  if (!fs.existsSync(agentDir)) {
    fs.mkdirSync(agentDir, { recursive: true });
  }

  // Unload if already exists
  try {
    execSync(`launchctl unload "${plistPath}" 2>/dev/null`);
  } catch {}

  fs.writeFileSync(plistPath, plistContent, "utf-8");
  console.log(`[LaunchAgent] Written to: ${plistPath}`);

  try {
    execSync(`launchctl load "${plistPath}"`);
    console.log(`✅ [LaunchAgent] Successfully loaded and scheduled into macOS!`);
    console.log(`⏰ Runs automatically every day at 12:30 PM and 4:30 PM without keeping terminal open.`);
  } catch (err) {
    console.error(`[LaunchAgent] Load failed:`, err.message);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  installAgent();
}
