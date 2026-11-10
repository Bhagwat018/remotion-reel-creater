import { execSync } from "child_process";

export function sendTextToAdb(str) {
  const lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 0) {
      // In adb shell input text, %s is space, other special characters need escaping or character-by-character
      const words = line.split(" ");
      for (let w = 0; w < words.length; w++) {
        const word = words[w];
        if (word.length > 0) {
          // encodeURIComponent or safe regex
          const safe = word.replace(/['"\`\$\(\)\!\#\&\;\|\<\>\*\?\\\[\]\{\}]/g, "");
          if (safe.length > 0) {
            execSync(`adb shell input text "${safe}"`);
          }
        }
        if (w < words.length - 1) {
          execSync("adb shell input text %s");
        }
      }
    }
    if (i < lines.length - 1) {
      execSync("adb shell input keyevent 66"); // ENTER key
    }
  }
}

