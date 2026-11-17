import fs from "fs";
import path from "path";

const segments = [
  {
    from: 0.0,
    to: 3.16,
    text: "Incognito mode on karke sochte ho koi nahi dekh raha?",
  },
  {
    from: 3.44,
    to: 5.12,
    text: "Asal me sab dekh rahe hain!",
  },
  {
    from: 5.44,
    to: 7.44,
    text: "Chalo iska dark secret samjhte hain.",
  },
  {
    from: 7.92,
    to: 10.08,
    text: "Incognito sirf ek kaam karta hai",
  },
  {
    from: 10.40,
    to: 13.60,
    text: "aapke phone se local history aur cookies delete karta hai,",
  },
  {
    from: 13.76,
    to: 16.60,
    text: "taaki ghar me koi phone check kare toh use kuch na dikhe.",
  },
  {
    from: 16.88,
    to: 19.60,
    text: "Lekin internet par aap bilkul nange ho!",
  },
  {
    from: 20.00,
    to: 21.92,
    text: "Pehla, aapka WiFi router",
  },
  {
    from: 22.12,
    to: 25.64,
    text: "uske DNS logs me har ek website ka naam record ho raha hai.",
  },
  {
    from: 26.04,
    to: 28.60,
    text: "Dusra, aapka Internet Service Provider",
  },
  {
    from: 28.80,
    to: 33.04,
    text: "Airtel ya Jio ko exact pata hai aap kis waqt kya browse kar rahe ho.",
  },
  {
    from: 33.44,
    to: 35.60,
    text: "Aur teesra, websites ka server",
  },
  {
    from: 35.84,
    to: 39.44,
    text: "jo aapka public IP aur device fingerprint live track karta hai!",
  },
  {
    from: 39.76,
    to: 45.52,
    text: "Even Google par 5 Billion Dollars ka lawsuit hua tha Incognito users ko track karne ke liye!",
  },
  {
    from: 45.88,
    to: 50.20,
    text: "Real privacy chahiye toh hamesha trustworthy VPN ya Tor use karo.",
  },
  {
    from: 50.56,
    to: 53.44,
    text: "Aise hi tech secrets ke liye follow karo crackwithcode!",
  },
];

const wordsList = [];

for (const seg of segments) {
  const words = seg.text.split(/\s+/).filter(Boolean);
  const dur = seg.to - seg.from;
  const wordDur = dur / words.length;
  for (let i = 0; i < words.length; i++) {
    const startSec = parseFloat((seg.from + i * wordDur).toFixed(2));
    const endSec = parseFloat((startSec + wordDur).toFixed(2));
    wordsList.push({
      word: words[i],
      startSec,
      endSec,
    });
  }
}

const slug = "the-truth-about-incognito-mode";
const outPath1 = path.join("reels", slug, "words.json");
const outPath2 = path.join("public", "reels", slug, "words.json");

fs.writeFileSync(outPath1, JSON.stringify(wordsList, null, 2));
fs.writeFileSync(outPath2, JSON.stringify(wordsList, null, 2));

console.log(`✅ Generated ${wordsList.length} precision words in ${outPath1} and ${outPath2}`);

