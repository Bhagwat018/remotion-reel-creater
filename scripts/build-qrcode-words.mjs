import fs from "fs";
import path from "path";

const segments = [
  {
    from: 0.0,
    to: 4.5,
    text: "Chai ki tapri par scratch hua QR code ho, ya metro ka phata hua ticket...",
  },
  {
    from: 4.8,
    to: 9.1,
    text: "camera 0.1 second me scan karke payment kaise pass kar deta hai?",
  },
  {
    from: 9.46,
    to: 12.0,
    text: "Kyunki QR code koi normal barcode nahi,",
  },
  {
    from: 12.2,
    to: 14.2,
    text: "ek self-healing superpower hai!",
  },
  {
    from: 14.5,
    to: 16.9,
    text: "Iske peeche hai wahi mathematical algorithm",
  },
  {
    from: 17.1,
    to: 21.6,
    text: "jo NASA deep space satellites ke corrupted signals ko repair karne ke liye use karta hai —",
  },
  {
    from: 22.0,
    to: 23.9,
    text: "Reed-Solomon Error Correction!",
  },
  {
    from: 24.3,
    to: 28.9,
    text: "QR code me data 30% extra redundancy ke saath multiply hota hai.",
  },
  {
    from: 29.2,
    to: 32.5,
    text: "Agar aap iska 30% hissa phaad kar phek bhi do,",
  },
  {
    from: 32.7,
    to: 35.7,
    text: "toh phone ka scanner mathematical equations solve karke",
  },
  {
    from: 35.9,
    to: 38.6,
    text: "missing pixels ko hawa me reconstruct kar leta hai!",
  },
  {
    from: 38.9,
    to: 43.7,
    text: "Isi hack ki wajah se beech me brand ka logo lagane par bhi scan kabhi fail nahi hota!",
  },
  {
    from: 44.2,
    to: 48.1,
    text: "Aise hi mind-blowing tech secrets ke liye follow karo crackwithcode!",
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

const slug = "how-qr-code-error-correction-works";
const outPath1 = path.join("reels", slug, "words.json");
const outPath2 = path.join("public", "reels", slug, "words.json");

fs.writeFileSync(outPath1, JSON.stringify(wordsList, null, 2));
fs.writeFileSync(outPath2, JSON.stringify(wordsList, null, 2));

console.log(`✅ Generated ${wordsList.length} precision words in ${outPath1} and ${outPath2}`);

