/**
 * Groww Action Card & IPO Radar Formatter (Simple Hinglish Edition)
 * Highlights Buy/Wait/Avoid decisions prominently and explains all mechanics in plain Hinglish.
 */

export function formatGrowwStockCard(stockData, tradeSetup, aiResearch) {
  const c = stockData.cleanName;
  const price = stockData.currentPrice;
  const sl = tradeSetup.stopLoss.price;
  const slPct = tradeSetup.stopLoss.pct;
  const tgt1 = tradeSetup.target1.price;
  const tgt1Pct = tradeSetup.target1.pct;
  const tgt2 = tradeSetup.target2.price;
  const tgt2Pct = tradeSetup.target2.pct;
  const rr = tradeSetup.riskRewardRatio;
  const alloc = tradeSetup.maxAllocationPct;

  const decisionBadge =
    aiResearch.decisionBadge ||
    (price <= tradeSetup.buyZone.max
      ? "🟢 ABHI KHAREED SAKTE HAIN (BUY IN ZONE)"
      : "🟡 THODA WAIT KARO (DIP PAR KHAREEDNA)");

  const whyBuy = (aiResearch.whyBuyHinglish || aiResearch.growthCatalysts || [])
    .map((c, i) => `  ${i + 1}. 🔥 ${c}`)
    .join("\n");

  const risks = (aiResearch.riskHinglish || aiResearch.downsideRisks || [])
    .map((r, i) => `  ${i + 1}. ⚠️ ${r}`)
    .join("\n");

  return `
╔══════════════════════════════════════════════════════════════╗
  🎯 GROWW TRADING PICK: ${c} (NSE)
  👉 DECISION: ${decisionBadge}
╚══════════════════════════════════════════════════════════════╝
📱 GROWW APP ME EXACT ORDER KAISE LAGAYEIN:
  • Order Type:           Delivery (Cash) me lena hai (Intraday NAHI!)
  • Current Price:        ₹${price} (${stockData.dayChangePct > 0 ? "+" : ""}${stockData.dayChangePct}%)
  • Sahi Khareed Price:   ₹${tradeSetup.buyZone.min} se ₹${tradeSetup.buyZone.max} ke beech
  • STRICT STOP-LOSS:     ₹${sl} (-${slPct}%) [Nuksaan se bachne ke liye 🛡️]
  • PEHLA TARGET (TGT1):  ₹${tgt1} (+${tgt1Pct}%) [Yahan 50% shares bech kar profit book karein]
  • DOOSRA TARGET (TGT2): ₹${tgt2} (+${tgt2Pct}%) [Bache hue shares yahan bechein]
  • Risk-Reward:          1 : ${rr} (Chhota Risk, Bada Profit)
  • Kitna Paisa Lagayein: Groww wallet ka maximum ${alloc}% hi lagayein

💡 COMPANY KYA KARTI HAI:
  ${aiResearch.simpleCompanyIntro || aiResearch.companyMoat}

🚀 KYUN KHAREEDEIN? (UPAR JANE KE REASONS):
${whyBuy}

⚠️ KHATRA KYA HAI? (RISK & KAB EXIT KAREIN):
${risks}

📋 AAKHRI FAISLA:
  👉 ${aiResearch.finalVerdict || aiResearch.verdictHeadline}
  👉 Step: ${aiResearch.growwStepByStep || "Groww app kholein aur Limit order lagayein"}
────────────────────────────────────────────────────────────────`;
}

export function formatIpoCard(ipo) {
  const gmpEmoji = ipo.gmpPercent >= 30 ? "🚀" : ipo.gmpPercent >= 15 ? "📈" : "⚠️";
  return `
╔══════════════════════════════════════════════════════════════╗
  ${gmpEmoji} GROWW IPO RADAR: ${ipo.name} (${ipo.category})
╚══════════════════════════════════════════════════════════════╝
📱 GROWW ACTION VERDICT:
  • Status:            ${ipo.statusLabel || "UPCOMING"}
  • VERDICT:           ${ipo.verdict}
  • Conviction:        ${ipo.conviction}
  • Price Band:        ₹${ipo.priceBand}
  • Lot Size:          ${ipo.lotSize} shares
  • Issue Size:        ${ipo.issueSize}

📊 GREY MARKET & DEMAND:
  • Current GMP:       ${ipo.gmpPrice} (${ipo.gmpPercent}%)
  • Subscription:      ${ipo.subscription}
  • Bidding Window:    ${ipo.openDate} ➔ ${ipo.closeDate}
  • Expected Listing:  ${ipo.listingDate || "TBA"}

💡 SAFE STRATEGY:
  ${
    ipo.gmpPercent >= 25
      ? "Apply for Listing Gains via UPI on Groww. Book profits on Listing Day if GMP holds >25%."
      : "High Risk / Subdued Demand. Better to avoid blocking capital for weak listing gains."
  }
────────────────────────────────────────────────────────────────`;
}
