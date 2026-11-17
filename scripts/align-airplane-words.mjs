import fs from 'fs';

const segments = [
  {
    start: 0.0,
    end: 9.68,
    text: "Take-off hote hi air hostess chillati hai: 'Phones ko Airplane Mode par daalo!' Lekin kya ek phone on rehne se 300 logon se bhara plane sach me crash ho sakta hai?"
  },
  {
    start: 9.68,
    end: 17.00,
    text: "javab h : Plane crash toh bilkul nahi hoga! Lekin do aisi cheezein hoti hain jo landing ko khatarnak bana sakti hain."
  },
  {
    start: 17.00,
    end: 24.50,
    text: "Pehla: 35,000 feet par tower dhoondhne ke liye aapka phone full power radio waves fekta hai,"
  },
  {
    start: 24.50,
    end: 32.80,
    text: "jo pilot ke headset me wahi irritating 'bzz-bzz' shor paida karta hai jo purane speakers ke paas aata tha — jisse Air Traffic Control ki aawaz dab jaati hai!"
  },
  {
    start: 32.80,
    end: 41.68,
    text: "Doosra: High-power 5G signals plane ke Radar Altimeter ko confuse kar sakte hain, jo badal aur fog me runway ki accurate height batata hai!"
  },
  {
    start: 41.68,
    end: 48.85,
    text: "Toh agli baar flight me pilot ke kaan zaroor bacha lena! Aise hi smart tech secrets ke liye follow karo crackwithcode!"
  }
];

const words = [];

for (const seg of segments) {
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

fs.writeFileSync('reels/why-airplane-mode-on-flights/words.json', JSON.stringify(words, null, 2));
fs.writeFileSync('public/reels/why-airplane-mode-on-flights/words.json', JSON.stringify(words, null, 2));
console.log(`Generated ${words.length} timed words for Airplane Mode reel.`);
