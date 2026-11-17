
# 🚀 Instagram Autonomous Client Acquisition Engine (`@techwith.genz`)

An autonomous, ban-proof client outreach engine that discovers local businesses (Gyms, Doctors/Clinics, Real Estate Realtors, Cafes, Coaching Institutes), audits their digital presence, generates hyper-personalized pitches using Gemini AI, and safely initiates high-conversion Instagram DMs offering custom Websites & Google Play Store Android Apps.

---

## 💎 The Unique Value Proposition (The Play Store Advantage)

- **Pain Point:** Most local businesses manage appointments, member lists, and orders manually on WhatsApp or paper registers, or pay heavy commissions to aggregators (Zomato 30%, Practo 20%).
- **Your Edge:** You have an active **Google Play Console Account**. Almost NO local freelancer offers:
  > _"We build your custom business website and publish your official branded Android App live on Google Play Store in 7 days."_
- **Pricing Strategy:** We emphasize fast turnaround and founder-friendly low rates, but **never mention any price or currency in the first DM**. This triggers curiosity and invites them to ask: _"How much does it cost? Can I see the demo?"_

---

## 🎯 Target Niches (`config/niches.json`)

1. **Gyms & Fitness Centers** (`#indoregym`, `#delhigym`, `#mumbaifitness`, `#bangalorefitness`)
   - _Pain:_ Member admissions & workout plans managed on WhatsApp.
   - _Hook:_ Branded Play Store workout & fee-tracking app.
2. **Doctors, Dentists & Clinics** (`#delhidentist`, `#mumbaidermatologist`, `#punedental`)
   - _Pain:_ Heavy aggregator fees, reception phone chaos.
   - _Hook:_ Direct 1-click appointment booking web-app with WhatsApp reminders.
3. **Real Estate Brokers** (`#mumbairealtor`, `#delhirealestate`, `#puneproperties`)
   - _Pain:_ Heavy PDFs on WhatsApp that buyers lose.
   - _Hook:_ Interactive 3D/video property showroom with 1-click site visit scheduling.
4. **Cafes & Dining** (`#delhicafe`, `#mumbaicafe`, `#indorecafe`, `#bangalorecafes`)
   - _Pain:_ Losing 25-30% margin on Swiggy/Zomato.
   - _Hook:_ Direct QR-code table ordering app with 100% retained profits.
5. **Coaching Institutes** (`#delhicoaching`, `#neetcoaching`, `#upsccoaching`)
   - _Pain:_ Manual batch & test management.
   - _Hook:_ Branded student test series & video lecture mobile app.

---

## 🛡️ Ban-Proof Anti-Spam Architecture

- **Safe Daily Quota:** Capped at **10 to 14 DMs/day** (Instagram's natural human limit).
- **Active Business Window:** Strictly runs between **12:00 PM and 8:00 PM IST** (when business owners actively check messages).
- **Human Warmup:** Scrolls target profile for 4-8 seconds before clicking Message.
- **Human Typing:** Types messages character-by-character with 20-35ms randomized delay.
- **Pacing:** 60-120 seconds randomized pause between consecutive outreaches.
- **Zero Duplicate Text:** Gemini (`gemini-flash-lite-latest`) crafts a 100% unique pitch for every single profile based on their exact bio, city, and equipment/specialty.

---

## 📂 Project Structure

```
client-acquisition-engine/
├── config/
│   ├── niches.json             # 5 targeted business categories & hashtags
│   └── settings.json           # Daily caps, session dir, active hours, delays
├── data/
│   ├── prospects.json          # Discovered businesses with audit info
│   ├── outreach-log.json       # Permanent ledger of all sent DMs
│   └── daily-stats.json        # Daily counters
├── reports/                    # Daily markdown execution reports
├── scripts/
│   ├── discover-prospects.mjs  # Scrapes hashtags & profiles for new leads
│   ├── generate-pitch.mjs      # Gemini API prompt engine
│   ├── send-dm.mjs             # Playwright human DM automation
│   ├── run-daily-outreach.mjs  # Master pipeline runner
│   ├── scheduler.mjs           # Background daemon runner
│   └── install-launchagent.mjs # Native macOS background scheduler
└── README.md
```

---

## 🛠️ How to Run

### 1. Test Gemini Pitch Generation (No Browser)

```bash
node client-acquisition-engine/scripts/generate-pitch.mjs
```

### 2. Discover Fresh Local Businesses

```bash
# Find 8 fresh gym or clinic leads
node client-acquisition-engine/scripts/discover-prospects.mjs --max=8
```

### 3. Dry-Run DM (Generates pitch & previews without sending)

```bash
node client-acquisition-engine/scripts/send-dm.mjs --dry-run
```

### 4. Run Daily Pipeline (Finds leads, generates pitches & sends DMs)

```bash
# Test run immediately (bypasses hours check)
node client-acquisition-engine/scripts/run-daily-outreach.mjs --force

# Real run in dry-run mode (safe preview)
node client-acquisition-engine/scripts/run-daily-outreach.mjs --force --dry-run
```

### 5. Automatic Background Scheduling (No Manual Work Needed!)

To let your Mac run this automatically every single day at **12:30 PM and 4:30 PM**:

```bash
node client-acquisition-engine/scripts/install-launchagent.mjs
```

_macOS will handle everything in the background and write reports to `reports/report-YYYY-MM-DD.md`._
