import fs from 'fs';

const subSegments = [
  {
    start: 0.0,
    end: 4.0,
    text: "Roz subah 9:15 pe ek aisa bazaar khulta hai"
  },
  {
    start: 4.0,
    end: 7.4,
    text: "jahan roz ek lakh crore ka sauda hota hai par dukaan ek bhi nahi!"
  },
  {
    start: 7.4,
    end: 13.1,
    text: "Aakhir ye Share Market ka invisible system kaam kaise karta hai?"
  },
  {
    start: 13.1,
    end: 17.5,
    text: "Jaise hi aap BUY dabate ho aapka broker nahi"
  },
  {
    start: 17.5,
    end: 25.2,
    text: "NSE aur BSE ka high-speed matching engine sirf 0.001 second me seller ke sath aapka order match karta hai!"
  },
  {
    start: 25.2,
    end: 29.5,
    text: "Agla step SEBI ka radar system fraud check karta hai"
  },
  {
    start: 29.5,
    end: 34.2,
    text: "aur T+1 settlement me shares seedha aapke Demat account me deposit ho jaate hain!"
  },
  {
    start: 34.2,
    end: 39.5,
    text: "Aapke ghar me share market ko kya bolte hain: Jua ya Real Investment? Comment karke batao"
  },
  {
    start: 39.5,
    end: 44.36,
    text: "aur aise hi smart market secrets ke liye follow karo techwith genz!"
  }
];

const words = [];

for (const seg of subSegments) {
  const rawTokens = seg.text.split(/\s+/).filter(Boolean);
  const duration = seg.end - seg.start;
  const tokenDuration = duration / rawTokens.length;

  rawTokens.forEach((token, idx) => {
    const cleanWord = token.replace(/^[—–\(\)\[\]"“':]+|[—–\(\)\[\]"“':]+$/g, '');
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

const targetDirs = [
  'reels/how-share-market-really-works',
  'public/reels/how-share-market-really-works'
];

for (const dir of targetDirs) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/words.json`, JSON.stringify(words, null, 2), 'utf-8');
}

console.log(`✅ Generated ${words.length} timed words for Share Market reel.`);
