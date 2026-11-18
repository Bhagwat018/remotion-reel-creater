# 🧠 Groww AI Trading & IPO Research Copilot

A personal, institutional-grade AI research engine that runs daily before market open, analyzes NSE stocks and live IPOs, filters out high-risk traps, and delivers high-probability **Groww Action Blueprints** directly to your phone.

---

## 🔒 100% Free & Zero Account Access (Privacy First)

- **Zero Groww Credentials Needed**: The tool never asks for your Groww password, API keys, or pin. You retain 100% control of your phone and demat account.
- **100% Free Public Market Data**:
  - Yahoo Finance OHLCV & Technicals (Free, unlimited)
  - InvestorGain & Chittorgarh Live IPO & GMP tracking (Free public data)
  - Google Gemini AI (Free tier for deep research reasoning)
  - Local Web Dashboard (Runs locally on your Mac & Phone over Wi-Fi)

---

## 📱 How to Open on Your Phone

Make sure your phone and your Mac are connected to the same Wi-Fi network:

1. **On your Phone (Safari / Chrome)**:
   👉 **`http://10.10.40.93:3300`**
2. **On your Mac**:
   👉 **`http://localhost:3300`**

---

## 🛠️ CLI Commands (Terminal)

```bash
# 1. Full Morning Scan (Screens all NSE stocks + Live IPOs)
node trading-copilot/src/cli.mjs --scan

# 2. Quick 10-Second Morning Scan (Top momentum candidates)
node trading-copilot/src/cli.mjs --quick

# 3. Live IPO Intelligence & GMP Tracker Only
node trading-copilot/src/cli.mjs --ipo

# 4. Instant On-Demand X-Ray on Any NSE Stock
node trading-copilot/src/cli.mjs --stock=TATASTEEL
node trading-copilot/src/cli.mjs --stock=BEL
node trading-copilot/src/cli.mjs --stock=ZOMATO

# 5. Start / Restart the Local Web Dashboard
node trading-copilot/src/server/dashboardServer.mjs
```

---

## 🛡️ The 5 Golden Rules of Capital Protection

1. **Strict 2.5% to 3.5% Stop-Loss**: Cuts losing trades early before emotions take over.
2. **Minimum 1 : 2.5 Risk-Reward Ratio**: Mathematically guarantees long-term profitability even with a 50% win rate.
3. **Target 1 Profit Booking**: Always book 50% profit at Target 1 and immediately trail your Stop-Loss to Cost (zero-risk trade thereafter).
4. **No Penny Stocks / Pump & Dump Traps**: Only scans liquid companies with Market Cap > ₹1,500 Cr and strong balance sheets.
5. **IPO Safety Filter**: Only apply for IPOs with GMP > 20% and strong QIB institutional demand.

---

npm run copilot

# 1. 10-Second Quick Morning Brief (Top Stocks + Active IPOs)

npm run copilot:quick

# 2. Sirf Active & Upcoming IPOs Ka Status Dekhne Ke Liye

npm run copilot:ipo

# 3. Kisi specific stock ka AI X-Ray dekhne ke liye (e.g. BEL, TATASTEEL, ZOMATO)

node trading-copilot/src/cli.mjs --stock=BEL
node trading-copilot/src/cli.mjs --stock=TATASTEEL
