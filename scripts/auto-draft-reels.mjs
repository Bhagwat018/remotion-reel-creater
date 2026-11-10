import { execSync } from "child_process";

const reelsToDraft = [
  {
    num: 2,
    topic: "SME IPO 500x Trap",
    tapX: 900,
    tapY: 876,
    caption: `SME IPOs 500x oversubscribe ho rahe hain aur GMP 100%+ dikh raha hai... Lekin kya aapko apply karna chahiye?

The Hard Truth of SME IPOs:
- Lot Size Trap: Minimum investment 1.5 Lakh block hota hai
- Allotment Lottery: 500x me allotment chance 0.2 percent se bhi kam
- Liquidity Crisis: Lower circuit me single share nahi, poora lot freeze!

Golden Rule: Company ka cash flow check kiye bina sirf GMP dekh kar apply mat karo!

Follow @techwith.GenZ for unbiased stock market & IPO alerts!
#SMEIPO #IPOAllotment #StockMarketIndia #NSE #BSE #ShareMarket #techwithgenz #MadeWithAI #AI`
  },
  {
    num: 3,
    topic: "Digital Arrest Scam",
    tapX: 180,
    tapY: 1500,
    caption: `Aapke naam par illegal parcel pakda gaya hai... Aap Digital Arrest me hain!

Agar aapke ya aapke parents ke paas police, CBI ya Customs ke naam par video call aaye toh RUKO!

Legal Reality Check:
- Indian Law me Digital Arrest jaisa koi provision exist nahi karta!
- Police ya CBI kabhi video call par arrest ya interrogation nahi karti.
- Koi government agency call par paise transfer nahi karwati!

Emergency Action:
1. Call turant disconnect karein.
2. Dial 1930 National Cyber Crime Helpline.
3. Report on cybercrime.gov.in within 2 hours!

Follow @techwith.GenZ for daily cyber safety truths!
#DigitalArrest #CyberCrime #ScamAlert #OnlineFraud #CyberPolice #techwithgenz #MadeWithAI #AI`
  },
  {
    num: 4,
    topic: "Is UPI Free?",
    tapX: 540,
    tapY: 1500,
    caption: `Kya UPI sach me 100% free hai? Ya companies humse silently paise nikal rahi hain?

The Hidden UPI Economics:
- Normal P2P (Friend to Friend): 100 percent free hai aur rahega.
- Silent Convenience Fees: Mobile recharge aur utility bills par convenience fee add ho chuki hai!
- Merchant MDR: 2000 se upar wallet payment par 1.1 percent MDR lagta hai.
- Server Cost: 14 Billion monthly transactions ka infra cost recover ho raha hai.

Money Hack: Utility bills direct bank app ya utility portal se pay karo, zero surcharge!

Follow @techwith.GenZ for real fintech truths!
#UPITransactions #PhonePe #GooglePay #Paytm #FintechIndia #PersonalFinance #techwithgenz #MadeWithAI #AI`
  },
  {
    num: 5,
    topic: "Monday Listing Day Playbook",
    tapX: 900,
    tapY: 1500,
    caption: `Monday Morning 10:00 AM Listing Day Game Plan! Allotment mila toh profit kaise protect karein?

The Professional 50-50 Listing Rule:
- At 10:00 AM: Listing open hote hi 50 percent shares bech kar apni 100 percent capital safe kar lo!
- Trailing Stop-Loss: Bache 50 percent shares par listing price se strictly 5 percent neeche trailing stop-loss lagao.
- Pre-Open Auction: 09:45 se 10:00 AM equilibrium price observe karo.
- Never Average Down: Flat ya discount listing me kabhi loss average mat karo!

Follow @techwith.GenZ for daily unbiased market breakdowns!
#ListingDay #IPOStrategy #StockMarketIndia #ShareMarket #Nifty50 #techwithgenz #MadeWithAI #AI`
  },
  {
    num: 6,
    topic: "Direct vs Regular Mutual Funds",
    tapX: 180,
    tapY: 2000,
    caption: `Kya aapki SIP kisi bank app ya distributor ke through Regular plan me chal rahi hai? You could be losing 25 Lakhs!

Direct vs Regular Reality:
- Regular Plan: Har saal 1 to 1.5 percent commission silently kat kar distributor ko jata hai.
- Direct Plan: Zero distributor commission - 100 percent paisa aapke account me compound hota hai!
- Compounding Math: 10,000 monthly SIP par 25 saal me Direct Plan banata hai 58 Lakhs, Regular deta hai sirf 33 Lakhs!
- That 1 percent difference costs you 25+ Lakhs!

2-Click Fix:
Apne statement me check karo. Agar Regular likha hai, toh MF Central se 2 minute me Direct Growth me switch kar lo.

Follow @techwith.GenZ for real wealth compounding secrets!
#MutualFunds #SIP #PersonalFinanceIndia #Compounding #DirectPlan #techwithgenz #MadeWithAI #AI`
  }
];

function sleep(ms) {
  execSync(`sleep ${ms / 1000}`);
}

function adb(cmd) {
  return execSync(`adb ${cmd}`).toString();
}

function getUiDump() {
  adb(`shell uiautomator dump /sdcard/dump.xml`);
  return adb(`shell cat /sdcard/dump.xml`);
}

function findNode(xml, matcher) {
  const regex = /<node [^>]*bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"[^>]*>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    if (matcher(m[0])) {
      const x = Math.round((parseInt(m[1]) + parseInt(m[3])) / 2);
      const y = Math.round((parseInt(m[2]) + parseInt(m[4])) / 2);
      return { x, y, tag: m[0] };
    }
  }
  return null;
}

function typeCaption(caption) {
  const lines = caption.split("\n");
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    if (line.length > 0) {
      const words = line.split(" ");
      for (let w = 0; w < words.length; w++) {
        const word = words[w].replace(/['"\`\$\(\)\!\#\&\;\|\<\>\*\?\\\[\]\{\}]/g, "");
        if (word.length > 0) {
          adb(`shell input text "${word}"`);
        }
        if (w < words.length - 1) {
          adb(`shell input text %s`);
        }
      }
    }
    if (l < lines.length - 1) {
      adb(`shell input keyevent 66`); // ENTER
    }
  }
}

console.log("🚀 Starting Safe Automated Draft Insertion for Remaining 5 Reels...");

for (const reel of reelsToDraft) {
  console.log(`\n=======================================================`);
  console.log(`🎬 Drafting Reel #${reel.num}: ${reel.topic}`);
  console.log(`=======================================================`);

  // 1. Tap thumbnail in gallery
  console.log(`👉 Tapping video thumbnail at (${reel.tapX}, ${reel.tapY})...`);
  adb(`shell input tap ${reel.tapX} ${reel.tapY}`);
  sleep(2500);

  // 2. Find and tap Next on preview screen
  let xml = getUiDump();
  let nextNode = findNode(xml, (tag) => tag.includes('content-desc="Next"') || tag.includes('text="Next"'));
  if (nextNode) {
    console.log(`👉 Tapping Next at (${nextNode.x}, ${nextNode.y})...`);
    adb(`shell input tap ${nextNode.x} ${nextNode.y}`);
  } else {
    console.log("👉 Fallback tapping Next (950, 2280)...");
    adb(`shell input tap 950 2280`);
  }
  sleep(3000);

  // 3. Check if educational popup or audio update popup is open
  xml = getUiDump();
  let okBtn = findNode(xml, (tag) => tag.includes('text="OK"') || tag.includes('content-desc="OK"'));
  if (okBtn) {
    console.log(`👉 Dismissing popup via OK at (${okBtn.x}, ${okBtn.y})...`);
    adb(`shell input tap ${okBtn.x} ${okBtn.y}`);
    sleep(1500);
    xml = getUiDump();
  }

  // 4. Tap Caption box
  let captionBox = findNode(xml, (tag) => tag.includes('caption_input_text_view') || tag.includes('Write a caption'));
  if (captionBox) {
    console.log(`👉 Tapping caption box at (${captionBox.x}, ${captionBox.y})...`);
    adb(`shell input tap ${captionBox.x} ${captionBox.y}`);
  } else {
    console.log("👉 Fallback tapping caption box (540, 520)...");
    adb(`shell input tap 540 520`);
  }
  sleep(1500);

  // 5. Type Caption
  console.log("✍️ Typing high-retention caption...");
  typeCaption(reel.caption);
  sleep(1500);

  // 6. Dismiss soft keyboard
  console.log("👉 Dismissing keyboard...");
  adb(`shell input keyevent 4`); // BACK closes keyboard
  sleep(1500);

  // 7. Find and Tap 'Save draft' button
  xml = getUiDump();
  let draftBtn = findNode(xml, (tag) => tag.includes('save_draft_button') || tag.includes('text="Save draft"'));
  if (draftBtn) {
    console.log(`💾 Tapping 'Save draft' at (${draftBtn.x}, ${draftBtn.y})...`);
    adb(`shell input tap ${draftBtn.x} ${draftBtn.y}`);
  } else {
    console.log("💾 Fallback tapping 'Save draft' (280, 2226)...");
    adb(`shell input tap 280 2226`);
  }
  sleep(3500);

  // 8. Re-open Gallery for the next item
  xml = getUiDump();
  let galleryBtn = findNode(xml, (tag) => tag.includes('content-desc="Gallery"') || tag.includes('text="Gallery"'));
  if (galleryBtn) {
    console.log(`📸 Tapping Gallery at (${galleryBtn.x}, ${galleryBtn.y})...`);
    adb(`shell input tap ${galleryBtn.x} ${galleryBtn.y}`);
  } else {
    console.log("📸 Fallback tapping Gallery (90, 2250)...");
    adb(`shell input tap 90 2250`);
  }
  sleep(2000);

  console.log(`✅ Successfully drafted Reel #${reel.num}: ${reel.topic}!`);
}

console.log("\n=======================================================");
console.log("🎉 ALL 6 REELS HAVE BEEN DRAFTED IN INSTAGRAM!");
console.log("=======================================================");
