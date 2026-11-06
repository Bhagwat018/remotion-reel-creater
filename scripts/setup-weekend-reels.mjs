import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const weekendReels = [
  // -------------------------------------------------------------
  // REEL 1 (SATURDAY 11:30 AM): Zepto & Blinkit Dark Store Economics
  // -------------------------------------------------------------
  {
    meta: {
      slug: "zepto-blinkit-dark-store-economics",
      topic: "Zepto & Blinkit 10-Minute Dark Store Economics",
      title: "10-Minute Delivery Trap: ₹70 Loss Per Order",
      handle: "@techwith.GenZ",
      language: "Hinglish",
      audience: "Indian Consumers, Techies & Gen-Z Traders",
      loop: false,
      captions: true,
      captionStyle: "kinetic",
      bgm: false,
      voice: "rohan",
      voiceSpeed: 1.10,
      showTicker: true,
      tickerPosition: "bottom",
      tickerBottomOffset: 130,
      manychatHook: false,
      instagramCaption: "Blinkit aur Zepto 10 minute me delivery de kar har order par ₹70 ka loss kaise jhel rahe hain? 🛵📦\n\nHere is the quick commerce reality check:\n• Dark Store Cost: ₹110 per delivery\n• Customer Fee: Only ₹15-₹25\n• Silent Trap: Handling fees & surge pricing creeping up\n\nFollow @techwith.GenZ for daily tech & business breakdowns!\n\n#QuickCommerce #Zepto #Blinkit #StartupIndia #TechNews #techwithgenz",
      disclaimer: "Educational content only. Based on publicly disclosed Quick Commerce unit economics."
    },
    scenes: [
      {
        id: "s1-hook",
        type: "title",
        headline: "10 MIN DELIVERY TRAP: ₹70 LOSS?!",
        leadIn: "QUICK COMMERCE TRUTH 🚨",
        voice: "Bhai suno! Blinkit aur Zepto har 10-minute delivery par 70 rupaye ka loss jhel rahe hain!"
      },
      {
        id: "s2-compare",
        type: "card",
        headline: "DARK STORE REALITY: ₹110 KHARCHA",
        leadIn: "HIGH-RENT WAREHOUSES 🏢",
        voice: "Har do kilometer par dark store aur delivery staff milakar delivery kharcha 110 rupaye aata hai!"
      },
      {
        id: "s3-stat",
        type: "terminal",
        headline: "CUSTOMER PAYS ONLY ₹20",
        leadIn: "VC CASH SUBSIDY 💸",
        voice: "Lekin aapse sirf 20 rupaye lete hain, bacha hua 70 rupaye VC funding se burn hota hai!"
      },
      {
        id: "s4-chart",
        type: "card",
        headline: "SILENT SURGE FEES CREEPING IN",
        leadIn: "THE SUBSIDY IS ENDING ⚠️",
        voice: "Ab funding rukte hi silently handling fee aur surge charges add ho rahe hain!"
      },
      {
        id: "s5-steps",
        type: "pills",
        headline: "SMART CONSUMER GOLDEN RULE",
        leadIn: "SAVE ₹15,000 YEARLY 💰",
        items: [
          "Emergency Only for 10-Min Delivery",
          "Daily Grocery from Local Kirana",
          "Check Silent Surge Fees"
        ],
        voice: "Rule simple hai: Emergency me hi quick commerce use karo, daily grocery local store se lo!"
      },
      {
        id: "s6-cta",
        type: "cta",
        headline: "FOLLOW TECH WITH GEN Z",
        leadIn: "UNBIASED TECH & MONEY TRUTHS 🔥",
        voice: "Aise hi real startup aur tech reality checks ke liye Tech with Gen Z ko abhi follow karo!"
      }
    ]
  },

  // -------------------------------------------------------------
  // REEL 2 (SATURDAY 03:30 PM): The 500X SME IPO Allotment Trap
  // -------------------------------------------------------------
  {
    meta: {
      slug: "sme-ipo-500x-allotment-trap",
      topic: "The 500X SME IPO Allotment Trap & Grey Market Truth",
      title: "500X SME IPO Allotment Trap: Retail Truth",
      handle: "@techwith.GenZ",
      language: "Hinglish",
      audience: "Indian Retail Investors & Gen-Z Traders",
      loop: false,
      captions: true,
      captionStyle: "kinetic",
      bgm: false,
      voice: "rohan",
      voiceSpeed: 1.10,
      showTicker: true,
      tickerPosition: "bottom",
      tickerBottomOffset: 130,
      manychatHook: false,
      instagramCaption: "Kya SME IPOs me 500X subscription dekh kar apply karna safe hai? ⚠️📉\n\nSME IPO Reality Check:\n• Allotment Odds: 1 in 850+ when 500x subscribed\n• Liquidity Risk: Lot-based selling means no exit during lower circuits\n• Golden Rule: Check audited 3-year PAT, ignore artificial GMP hype!\n\nFollow @techwith.GenZ for daily unbiased market truth!\n\n#SMEIPO #StockMarketIndia #IPOAlert #ShareMarket #techwithgenz #InvestingTips",
      disclaimer: "Educational content only. Not SEBI registered investment advice."
    },
    scenes: [
      {
        id: "s1-hook",
        type: "title",
        headline: "500X SME IPO ALLOTMENT TRAP?!",
        leadIn: "GREY MARKET REALITY 🚨",
        voice: "Agar aap bhi har SME IPO me dedh lakh rupaye laga rahe ho... toh pehle yeh sach sun lo!"
      },
      {
        id: "s2-stat",
        type: "stat",
        headline: "RETAIL ODDS: 1 IN 850 APPLICANTS",
        leadIn: "THE MATH SHOCK 📉",
        voice: "Jab SME IPO 500 guna bharta hai, toh retail category me allotment ke odds 850 me se sirf ek hote hain!"
      },
      {
        id: "s3-gmp-gauge",
        type: "card",
        headline: "ARTIFICIAL OPERATOR DEMAND",
        leadIn: "GMP MANIPULATION ⚠️",
        voice: "Operators chote issue size me fake grey market demand banate hain taaki retail listing day par panic me buy kare!"
      },
      {
        id: "s4-compare",
        type: "terminal",
        headline: "NO LIQUIDITY IN LOWER CIRCUITS",
        leadIn: "LOT-BASED TRAP 🔒",
        voice: "Lower circuit lagne par exit impossible hota hai, kyunki yahan single share nahi, poora lot bechna padta hai!"
      },
      {
        id: "s5-steps",
        type: "pills",
        headline: "CAPITAL PROTECTION RULES",
        leadIn: "AVOID PENNY TRAPS 🛡️",
        items: [
          "Check Operating Cash Flow",
          "Avoid >100x Subscription Hype",
          "Never Apply on Fake GMP"
        ],
        voice: "Golden rule: Jin companies ka profit growth real na ho, sirf GMP dekh kar kabhi apply mat karna!"
      },
      {
        id: "s6-cta",
        type: "cta",
        headline: "FOLLOW FOR UNBIASED IPO ALERTS",
        leadIn: "SEBI COMPLIANT INSIGHTS 🔥",
        voice: "Unbiased daily IPO alerts aur live breakdown ke liye Tech with Gen Z ko follow karo!"
      }
    ]
  },

  // -------------------------------------------------------------
  // REEL 3 (SATURDAY 07:30 PM): Digital Arrest Scam Exposed
  // -------------------------------------------------------------
  {
    meta: {
      slug: "digital-arrest-scam-reality-check",
      topic: "Digital Arrest Scam: Fake Police Video Call Exposed",
      title: "Digital Arrest Scam: Fake Police Video Call Reality",
      handle: "@techwith.GenZ",
      language: "Hinglish",
      audience: "Indian Citizens, Parents & Techies",
      loop: false,
      captions: true,
      captionStyle: "kinetic",
      bgm: false,
      voice: "rohan",
      voiceSpeed: 1.10,
      showTicker: true,
      tickerPosition: "bottom",
      tickerBottomOffset: 130,
      manychatHook: false,
      instagramCaption: "CBI ya Police kabhi bhi WhatsApp par 'Digital Arrest' nahi karti! 🚨🛑\n\nBharat me 1200+ crore rupaye is scam me loote ja chuke hain. Remember these 3 rules:\n1. No Digital Arrest in Indian Law\n2. Never transfer funds to 'verification accounts'\n3. Immediate Emergency Helpline: Dial 1930\n\nApne parents aur family group me share karein!\n\n#CyberSecurity #DigitalArrest #ScamAlert #India #TechWithGenZ #CyberCrime1930",
      disclaimer: "Public awareness video based on Ministry of Home Affairs & Cyber Crime advisories."
    },
    scenes: [
      {
        id: "s1-hook",
        type: "title",
        headline: "FAKE POLICE VIDEO CALL SCAM?!",
        leadIn: "DIGITAL ARREST ALERT 🚨",
        voice: "Ruko! Agar kal aapko CBI ya Police ke naam se video call aaye... toh pehle yeh sun lena!"
      },
      {
        id: "s2-steps",
        type: "terminal",
        headline: "THE 3-STEP FEAR TRAP",
        leadIn: "MODUS OPERANDI ⚠️",
        voice: "Scammers bolte hain aapke parcel me drugs nikla hai, aur camera ke samne digital arrest rehna hoga!"
      },
      {
        id: "s3-stat",
        type: "stat",
        headline: "₹1,200 CRORE LOOTED IN INDIA",
        leadIn: "LIFE SAVINGS WIPED 💸",
        voice: "Is darr me aakar log apne life savings unke fake verification account me transfer kar dete hain!"
      },
      {
        id: "s4-compare",
        type: "card",
        headline: "NO DIGITAL ARREST IN LAW",
        leadIn: "INDIAN LEGAL TRUTH ⚖️",
        voice: "Indian law me digital arrest jaisa koi rule nahi hai! Police kabhi video call par arrest nahi karti!"
      },
      {
        id: "s5-steps",
        type: "terminal",
        headline: "DIAL 1930 IMMEDIATELY",
        leadIn: "EMERGENCY LIFELINE 🛡️",
        voice: "Aisa call aate hi turant disconnect karein aur national cyber helpline 1930 par complain karein!"
      },
      {
        id: "s6-cta",
        type: "cta",
        headline: "SHARE WITH PARENTS NOW",
        leadIn: "PROTECT YOUR FAMILY 🔥",
        voice: "Yeh video apne parents ke sath abhi share karo aur Tech with Gen Z ko follow karo!"
      }
    ]
  },

  // -------------------------------------------------------------
  // REEL 4 (SUNDAY 11:30 AM): Is UPI Really 100% Free?
  // -------------------------------------------------------------
  {
    meta: {
      slug: "is-upi-really-free-hidden-charges",
      topic: "Is UPI Really 100% Free? Hidden Platform Fees & MDR",
      title: "Is UPI Really Free? The 1.1% MDR & Surge Math",
      handle: "@techwith.GenZ",
      language: "Hinglish",
      audience: "Everyday Consumers & Gen-Z Traders",
      loop: false,
      captions: true,
      captionStyle: "kinetic",
      bgm: false,
      voice: "rohan",
      voiceSpeed: 1.10,
      showTicker: true,
      tickerPosition: "bottom",
      tickerBottomOffset: 130,
      manychatHook: false,
      instagramCaption: "Kya UPI sach me 100% free hai? Janiye platform fees aur 1.1% MDR ka sach! 💳🔍\n\nHidden Fees Breakdown:\n• Recharges/Bills: ₹2-₹5 Platform fee quietly added\n• Merchant Wallet Payments: 1.1% Interchange fee\n• Smart Fix: Pay utility bills directly on provider websites/bank apps for ₹0 surcharge!\n\nFollow @techwith.GenZ for daily honest finance breakdowns!\n\n#UPI #DigitalIndia #PersonalFinance #MoneyHacks #Fintech #techwithgenz",
      disclaimer: "Educational analysis based on NPCI circulars and Payment Aggregator guidelines."
    },
    scenes: [
      {
        id: "s1-hook",
        type: "title",
        headline: "IS UPI REALLY 100% FREE?!",
        leadIn: "HIDDEN CHARGES TRUTH 🚨",
        voice: "Aapko lagta hai UPI 100 percent free hai? Toh payment apps ka convenience fee check karo!"
      },
      {
        id: "s2-compare",
        type: "card",
        headline: "₹2 TO ₹5 PLATFORM FEES",
        leadIn: "RECHARGES & BILLS 📱",
        voice: "Recharge, electricity bill aur movie tickets par apps 2 se 5 rupaye platform fee lene lage hain!"
      },
      {
        id: "s3-stat",
        type: "terminal",
        headline: "1.1% WALLET INTERCHANGE",
        leadIn: "MERCHANT SURCHARGE 🏪",
        voice: "Aur 2000 rupaye se upar ke wallet payments par merchants par 1.1 percent MDR lagta hai!"
      },
      {
        id: "s4-chart",
        type: "stat",
        headline: "14 BILLION TRANSACTIONS/MONTH",
        leadIn: "SERVER RUNNING COSTS ⚡",
        voice: "Har mahine 14 billion transactions handle karne ka server cost nikalne ke liye yeh fees add ho rahi hain!"
      },
      {
        id: "s5-steps",
        type: "pills",
        headline: "ZERO FEE BILL PAYMENT HACK",
        leadIn: "BYPASS CONVENIENCE FEE 💡",
        items: [
          "Normal UPI P2P is 100% Free",
          "Pay Utility Bills via Direct Bank",
          "Avoid High Convenience Fees"
        ],
        voice: "Hack simple hai: Utility bills hamesha direct bank app ya government portal se pay karo, zero surcharge!"
      },
      {
        id: "s6-cta",
        type: "cta",
        headline: "FOLLOW FOR DAILY MONEY TRUTHS",
        leadIn: "SMART PERSONAL FINANCE 🔥",
        voice: "Aise hi daily money truths aur smart finance hacks ke liye Tech with Gen Z ko follow karo!"
      }
    ]
  },

  // -------------------------------------------------------------
  // REEL 5 (SUNDAY 03:30 PM): Monday Morning IPO Listing Playbook
  // -------------------------------------------------------------
  {
    meta: {
      slug: "monday-ipo-listing-day-playbook",
      topic: "Monday Morning IPO Listing Day Playbook: Sell or Hold?",
      title: "Monday Morning IPO Playbook: Sell or Hold?",
      handle: "@techwith.GenZ",
      language: "Hinglish",
      audience: "Indian Retail Investors & Gen-Z Traders",
      loop: false,
      captions: true,
      captionStyle: "kinetic",
      bgm: false,
      voice: "rohan",
      voiceSpeed: 1.10,
      showTicker: true,
      tickerPosition: "bottom",
      tickerBottomOffset: 130,
      manychatHook: false,
      instagramCaption: "Monday Morning Listing Day Game Plan! Allotment mila toh profit kaise secure karein? 🚀📊\n\nThe 50-50 Listing Rule:\n• At 10:00 AM: Sell 50% lot to pull out 100% principal capital\n• Trailing Stop-Loss: Put SL at -5% under listing price for the rest\n• Zero FOMO: Never average down a falling IPO on Day 1!\n\nFollow @techwith.GenZ for daily unbiased market breakdowns!\n\n#ListingDay #IPOStrategy #StockMarketIndia #ShareMarket #Nifty #techwithgenz",
      disclaimer: "Educational content only. Not SEBI registered investment advice."
    },
    scenes: [
      {
        id: "s1-hook",
        type: "title",
        headline: "MONDAY 10 AM: SELL OR HOLD?!",
        leadIn: "LISTING DAY GAMEPLAN 🚨",
        voice: "Monday subah 10 baje share market open hoga! Allotment mila toh kya karna hai — sell karein ya hold?"
      },
      {
        id: "s2-steps",
        type: "steps",
        headline: "THE 50-50 MASTER EXIT RULE",
        leadIn: "CAPITAL PROTECTION 🛡️",
        steps: [
          "Sell 50% Quantity on Listing",
          "Recover 100% Principal Capital",
          "Ride Remaining 50% Stress-Free"
        ],
        voice: "Master rule hai: Opening par 50 percent shares bech kar apni poori lagat safe kar lo!"
      },
      {
        id: "s3-chart",
        type: "chart",
        headline: "TRAILING STOP-LOSS AT -5%",
        leadIn: "PROTECT YOUR GAINS 🎯",
        voice: "Bache huye 50 percent par listing price se 5 percent neeche trailing stop-loss lagao!"
      },
      {
        id: "s4-compare",
        type: "compare",
        headline: "IF FLAT OR DISCOUNT LISTING",
        leadIn: "NEVER AVERAGE DOWN ⚠️",
        left: {
          label: "Green Listing (+30%)",
          items: ["Book 50% lot instantly", "Trail stop-loss on rest"]
        },
        right: {
          label: "Flat / Red Listing (-5%)",
          items: ["Do NOT average down", "Exit at stop-loss strictly"]
        },
        voice: "Aur agar listing flat ya discount par ho, toh hope me average mat karna! Stop-loss par exit karo!"
      },
      {
        id: "s5-stat",
        type: "chart",
        headline: "09:45 AM PRE-OPEN AUCTION",
        leadIn: "ORDER BOOK DEPTH ⏱️",
        voice: "Subah 9:45 par pre-open session me buyers aur sellers ka volume order book me check karna sabse zaroori hai!"
      },
      {
        id: "s6-cta",
        type: "cta",
        headline: "FOLLOW FOR PRE-OPEN ALERTS",
        leadIn: "DAILY MARKET INSIGHTS 🔥",
        voice: "Monday market open hone se pehle live IPO alerts ke liye Tech with Gen Z ko follow karo!"
      }
    ]
  },

  // -------------------------------------------------------------
  // REEL 6 (SUNDAY 07:30 PM): Direct vs Regular Mutual Funds: The ₹25L Bleed
  // -------------------------------------------------------------
  {
    meta: {
      slug: "direct-vs-regular-mutual-funds-truth",
      topic: "Direct vs Regular Mutual Funds: The ₹25 Lakh Silent Bleed",
      title: "Direct vs Regular Mutual Funds: The ₹25L Trap",
      handle: "@techwith.GenZ",
      language: "Hinglish",
      audience: "Mutual Fund Investors & Gen-Z Wealth Builders",
      loop: false,
      captions: true,
      captionStyle: "kinetic",
      bgm: false,
      voice: "rohan",
      voiceSpeed: 1.10,
      showTicker: true,
      tickerPosition: "bottom",
      tickerBottomOffset: 130,
      manychatHook: false,
      instagramCaption: "Kya aapki SIP 'Regular' plan me chal rahi hai? You could be losing ₹25 Lakhs! 💸📉\n\nDirect vs Regular Reality:\n• Regular Plan: 1% commission deducted every year for the agent\n• Direct Plan: 100% of compounding stays in your account\n• Compounding Math: On a 25-yr SIP, that 1% difference equals ₹25+ Lakhs!\n\nCheck your portfolio today! Follow @techwith.GenZ for real wealth truths.\n\n#MutualFunds #SIP #PersonalFinance #WealthCreation #DirectPlan #techwithgenz",
      disclaimer: "Educational content only. Mutual fund investments are subject to market risks."
    },
    scenes: [
      {
        id: "s1-hook",
        type: "title",
        headline: "LOSING ₹25 LAKHS IN SIP?!",
        leadIn: "MUTUAL FUND SECRET 🚨",
        voice: "Bhai agar aap mutual fund SIP bank app se kar rahe ho... toh aap chup-chaap 25 lakh rupaye gawa rahe ho!"
      },
      {
        id: "s2-compare",
        type: "compare",
        headline: "REGULAR (1.8%) VS DIRECT (0.8%)",
        leadIn: "THE 1% COMMISSIONS TRICK ⚖️",
        left: {
          label: "Regular Plan (Bank App)",
          items: ["Expense: ~1.8%", "1% commission to agent"]
        },
        right: {
          label: "Direct Plan (Zero Broker)",
          items: ["Expense: ~0.8%", "Zero cut, 100% yours"]
        },
        voice: "Mutual funds me do options hote hain: Regular aur Direct! Regular me lagbhag 1 percent commission agent ko jata hai!"
      },
      {
        id: "s3-stat",
        type: "stat",
        headline: "₹10,000 SIP FOR 25 YEARS",
        leadIn: "COMPOUNDING SHOCK 💸",
        value: "₹25L",
        label: "Hidden Commission Drain",
        voice: "10,000 rupaye ki monthly SIP me 25 saal baad yeh chota sa 1 percent 25 lakh rupaye ban jata hai!"
      },
      {
        id: "s4-chart",
        type: "chart",
        headline: "₹58L DIRECT VS ₹33L REGULAR",
        leadIn: "WEALTH DIVERGENCE 📊",
        voice: "Direct plan me wahi paisa aapke account me compound hota hai, jabki Regular me agent ki jeb me jata hai!"
      },
      {
        id: "s5-steps",
        type: "steps",
        headline: "2-CLICK DIRECT SWITCH HACK",
        leadIn: "CHECK YOUR FOLIO ⚡",
        steps: [
          "Open MF Central or CAMS App",
          "Find Folios Marked Regular",
          "Click Switch to Direct Growth"
        ],
        voice: "Apne folio me check karo: Agar 'Regular' likha hai, toh aaj hi zero-commission app par Direct me switch karo!"
      },
      {
        id: "s6-cta",
        type: "cta",
        headline: "FOLLOW FOR WEALTH SECRETS",
        leadIn: "GEN-Z MONEY TRUTHS 🔥",
        voice: "Aise hi real wealth compounding secrets aur financial truth ke liye Tech with Gen Z ko follow karo!"
      }
    ]
  }
];

// Write reel.json files
weekendReels.forEach((reel) => {
  const dir = path.join(rootDir, "reels", reel.meta.slug);
  fs.mkdirSync(dir, { recursive: true });
  const pubDir = path.join(rootDir, "public", "reels", reel.meta.slug);
  fs.mkdirSync(pubDir, { recursive: true });

  const targetFile = path.join(dir, "reel.json");
  fs.writeFileSync(targetFile, JSON.stringify(reel, null, 2), "utf-8");
  fs.writeFileSync(path.join(pubDir, "reel.json"), JSON.stringify(reel, null, 2), "utf-8");
  console.log(`✅ Updated tight 30-33s reel.json for: ${reel.meta.slug}`);
});

console.log("\nAll 6 weekend reel.json definitions successfully updated!");
