import fs from 'fs';

const segments = [
  {
    start: 0.0,
    end: 7.5,
    text: "Aap nakli note me dhoka khaa sakte ho, par ATM machine sirf 0.2 second me use bahar kaise phek deti hai?"
  },
  {
    start: 7.5,
    end: 11.8,
    text: "Kyunki ATM note ko dekhta nahi, uska X-ray karta hai!"
  },
  {
    start: 11.8,
    end: 17.8,
    text: "Pehla, UV Light — jo note par chupi invisible glowing ink ko turant pakad leti hai."
  },
  {
    start: 17.8,
    end: 23.8,
    text: "Dusra, Magnetic Head — jo security thread ke andar chupe magnetic metal ko detect karta hai!"
  },
  {
    start: 23.8,
    end: 32.2,
    text: "Aur teesra, Laser Sensor — jo thickness naapta hai, kyunki asli note kagaz ka nahi, 100% pure cotton ka hota hai!"
  },
  {
    start: 32.2,
    end: 36.4,
    text: "Scammers print toh kar sakte hain, par ye physics copy nahi kar paate!"
  },
  {
    start: 36.4,
    end: 39.97,
    text: "Aise hi tech secrets ke liye follow karo crackwithcode!"
  }
];

const words = [];

for (const seg of segments) {
  // Split on whitespace, strip punctuation attached except useful hyphens
  const rawTokens = seg.text.split(/\s+/).filter(Boolean);
  const duration = seg.end - seg.start;
  const tokenDuration = duration / rawTokens.length;

  rawTokens.forEach((token, idx) => {
    const cleanWord = token.replace(/^[—–\(\)\[\]"“”]+|[—–\(\)\[\]"“”]+$/g, '');
    if (!cleanWord) return;
    const startSec = Number((seg.start + idx * tokenDuration).toFixed(3));
    const endSec = Number((seg.start + (idx + 1) * tokenDuration).toFixed(3));
    words.push({
      word: cleanWord,
      startSec,
      endSec
    });
  });
}

fs.writeFileSync('reels/how-atm-detects-fake-notes/words.json', JSON.stringify(words, null, 2));
fs.writeFileSync('public/reels/how-atm-detects-fake-notes/words.json', JSON.stringify(words, null, 2));
console.log(`Successfully generated ${words.length} timed words.`);
