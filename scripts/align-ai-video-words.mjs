import fs from 'fs';

const subSegments = [
  {
    start: 0.0,
    end: 3.5,
    text: "Ruko! Ek second is screen ko dhyaan se dekho..."
  },
  {
    start: 3.5,
    end: 8.2,
    text: "Is video me na koi camera use hua hai, na mic, aur na hi koi video editor!"
  },
  {
    start: 8.2,
    end: 12.5,
    text: "Yeh poori reel 100% CODE aur AI ne banayi hai!"
  },
  {
    start: 12.5,
    end: 15.10,
    text: "Kaise? Sirf chaar simple steps me:"
  },
  {
    start: 15.10,
    end: 20.45,
    text: "Step 1: AI agent ne research karke hyper-realistic voiceover generate kiya."
  },
  {
    start: 20.45,
    end: 26.15,
    text: "Step 2: Whisper AI ne har single word ka millisecond-accurate timestamp nikala."
  },
  {
    start: 26.15,
    end: 32.75,
    text: "Step 3: Premiere Pro ke bina, React aur Remotion ke code ne har frame ko mathematically render kiya."
  },
  {
    start: 32.75,
    end: 38.55,
    text: "Aur Step 4: Is avatar ka lip-sync bhi soundwave ke algorithm se code me drive kiya gaya!"
  },
  {
    start: 38.55,
    end: 42.20,
    text: "Video editing ka zamana gaya, ab CODE se videos banti hain!"
  },
  {
    start: 42.20,
    end: 46.37,
    text: "Aise hi insane tech secrets ke liye follow karo crackwithcode!"
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
  'reels/this-video-is-100-percent-code',
  'public/reels/this-video-is-100-percent-code'
];

for (const dir of targetDirs) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/words.json`, JSON.stringify(words, null, 2), 'utf-8');
}

console.log(`✅ Generated ${words.length} timed words for 100% Code AI Video reel.`);
