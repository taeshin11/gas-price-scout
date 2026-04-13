# GasPriceScout — PRD
## Gas Prices by State and City

---

## 1. Overview

**Service Name:** GasPriceScout
**Tagline:** "Find the cheapest gas near you — state and city rankings updated weekly"
**URL Pattern:** `gas-price-scout.vercel.app`
**GitHub Repo:** `taeshin11/gas-price-scout`

GasPriceScout is a US gas price tracking dashboard that sources weekly petroleum price data from the EIA (Energy Information Administration) free API. Users can browse by state, city, or fuel grade, view trend charts, and see regional rankings. All data is publicly available from government sources — zero cost.

**Target Users:**
- Daily commuters comparing local prices
- Road trip planners optimizing fuel stops
- Budget-conscious consumers tracking price trends
- Financial news audiences tracking inflation signals

---

## 2. Core Features

| ID  | Feature                                          | Priority |
|-----|--------------------------------------------------|----------|
| F01 | National average dashboard with trend chart      | P0       |
| F02 | State pages `/states/[state]`                    | P0       |
| F03 | City pages `/cities/[city-state]`                | P0       |
| F04 | Grade pages `/grades/[regular|premium|diesel]`   | P0       |
| F05 | US map visualization (SVG choropleth)            | P1       |
| F06 | Price trend chart (12 weeks) via Chart.js        | P0       |
| F07 | State rankings table (cheapest to most expensive)| P0       |
| F08 | i18n support (8 languages)                       | P1       |
| F09 | Visitor counter (footer)                         | P1       |
| F10 | Google Sheets webhook on interaction             | P1       |
| F11 | Adsterra ad placements                           | P1       |
| F12 | Sitemap + hreflang + schema.org                  | P0       |
| F13 | ISR revalidation every 7 days (EIA weekly data)  | P0       |
| F14 | research_history/ milestone logs                 | P2       |

---

## 3. Tech Stack

| Layer       | Technology                                          |
|-------------|-----------------------------------------------------|
| Framework   | Next.js 14 (App Router, SSG/ISR)                    |
| Styling     | Tailwind CSS v3 (mobile-first, pastel palette)      |
| Charts      | Chart.js 4 + react-chartjs-2                        |
| Map         | React Simple Maps (SVG, free) OR static SVG         |
| Data        | EIA API (free, no key for public endpoints)         |
| Fallback    | `data/gas-prices-fallback.json`                     |
| Deployment  | Vercel (`npx vercel --prod`)                        |
| Repo        | GitHub via `gh` CLI (`taeshin11/gas-price-scout`)   |
| i18n        | `next-intl`                                         |
| SEO         | `next-sitemap`, JSON-LD schema                      |
| Analytics   | Vercel Analytics (free tier)                        |
| Ads         | Adsterra (Social Bar + Native Banner + Display)     |

---

## 4. Data Sources

### Primary: EIA Petroleum Prices API
**Base URL:** `https://api.eia.gov/v2/petroleum/pri/gnd/data/`

**Key Endpoints (no API key required for public data):**
```
# Weekly US Regular Gasoline Prices by State
GET https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=DEMO_KEY&frequency=weekly&data[0]=value&facets[duoarea][]=R10&...

# National Average
GET https://api.eia.gov/v2/petroleum/pri/gnd/data/?api_key=DEMO_KEY&frequency=weekly&facets[product][]=EPM0&facets[duoarea][]=NUS
```

**Note:** EIA DEMO_KEY allows 100 requests/hour. Register for free key (unlimited).
Store as `EIA_API_KEY` env variable.

**Data Fields:** `period` (date), `duoarea` (region code), `area-name`, `product` (grade), `value` ($/gallon), `units`

### Supplementary: Static Data
- `data/gas-prices-fallback.json` — last known good prices for all 50 states
- `data/states.json` — state metadata (name, abbreviation, region, PADD)
- `data/cities.json` — major city data with estimated price offsets from state average
- `data/grade-descriptions.json` — fuel grade descriptions for SEO content

### Revalidation Strategy
- ISR: revalidate every 604800 seconds (7 days — EIA publishes weekly on Mondays)
- Build-time: pre-generate all 50 state pages + 3 grade pages
- Cities: generated on first visit (ISR fallback)

---

## 5. Page Structure & SEO

### `/` — National Dashboard
- **Title:** "Gas Prices by State Today (April 2026) — GasPriceScout"
- **H1:** "US Gas Prices This Week"
- National average hero stat (large, bold price)
- Week-over-week change badge (▲/▼ with %)
- Top 5 cheapest states + Top 5 most expensive states
- National trend chart (12 weeks, Chart.js line)
- US SVG choropleth map (color gradient by price)
- State rankings table (all 50 states, sortable)
- Native Banner ad below hero
- FAQ section (why do gas prices vary by state?)
- Schema: `WebSite`, `Dataset`, `FAQPage`

### `/states/[state]` — State Page
- State slug: `california`, `texas`, `florida`, etc.
- **Title:** "[State] Gas Prices This Week: Regular, Premium & Diesel | GasPriceScout"
- **H1:** "[State] Gas Prices — Week of April 14, 2026"
- Current prices by grade (Regular / Midgrade / Premium / Diesel / E85)
- State vs. national average comparison badges
- 12-week trend chart by grade
- Major cities in state with estimated prices
- Schema: `Dataset`, `BreadcrumbList`

### `/cities/[city-state]` — City Pages
- Slug format: `los-angeles-ca`, `houston-tx`, `chicago-il`
- **Title:** "[City], [State] Gas Prices Today | GasPriceScout"
- City price estimate (state avg ± offset based on metro data)
- Nearby cities comparison
- Link to state page
- Schema: `Dataset`, `BreadcrumbList`

### `/grades/[grade]` — Fuel Grade Pages
- Grades: `regular`, `midgrade`, `premium`, `diesel`, `e85`
- **Title:** "[Grade] Gas Prices by State — April 2026 | GasPriceScout"
- **H1:** "[Regular/Premium/Diesel] Gas Prices — All 50 States"
- Full state ranking for that specific grade
- National average for grade with historical context
- Schema: `Dataset`, `ItemList`

### SEO Infrastructure
```
/sitemap.xml    — all states + cities + grades
/robots.txt     — allow all
/[lang]/...     — hreflang 8 locales
```

---

## 6. UI/UX Design

### Color Palette (Soft Pastel)
```css
--bg-primary:    #FFFBEB   /* warm cream */
--bg-card:       #FFFFFF
--bg-accent:     #FEF3C7   /* light amber */
--text-primary:  #78350F
--text-secondary:#6B7280
--price-low:     #D1FAE5   /* cheap = green */
--price-mid:     #FEF9C3   /* mid = yellow */
--price-high:    #FEE2E2   /* expensive = red */
--cta-button:    #D97706   /* amber */
--border:        #E5E7EB
--chart-color:   #FBBF24   /* gold line */
```

### Layout Principles
- Mobile-first: hero stat full width, chart below
- Price card: large price display (tabular-nums font), grade label
- Rankings table: zebra stripes, sticky header on desktop
- Map: hidden on mobile (< 768px), shown on tablet+
- Trend arrows: green ▼ (price down, good), red ▲ (price up, bad)

### Key Components
- `PriceHero` — large national/state average with change badge
- `TrendChart` — Chart.js line, 12-week history
- `StateRankings` — sortable table (price, state, change)
- `GradeSelector` — pill tabs (Regular / Premium / Diesel / E85)
- `ChoroplethMap` — SVG US map with color fill
- `PriceBadge` — color-coded $/gallon badge

---

## 7. i18n Configuration

**Supported Locales:** `en`, `ko`, `ja`, `zh`, `es`, `fr`, `de`, `pt`
**Default Locale:** `en`
**Library:** `next-intl`

**Key Translation Strings:**
```json
{
  "hero.title": "US Gas Prices This Week",
  "hero.nationalAvg": "National Average",
  "hero.weekChange": "vs. last week",
  "table.state": "State",
  "table.regular": "Regular",
  "table.premium": "Premium",
  "table.diesel": "Diesel",
  "table.change": "Weekly Change",
  "grade.regular": "Regular Unleaded",
  "grade.premium": "Premium",
  "grade.diesel": "Diesel",
  "grade.e85": "E85 Ethanol",
  "map.cheapest": "Cheapest",
  "map.mostExpensive": "Most Expensive",
  "footer.visitorsToday": "Visitors today",
  "footer.visitorsTotal": "Total visitors",
  "footer.dataSource": "Data: U.S. Energy Information Administration"
}
```

---

## 8. Ad Integration (Adsterra)

### Social Bar — `<head>`
```html
<!-- TODO: Replace with Adsterra Social Bar script -->
<!-- ADSTERRA_SOCIAL_BAR_PLACEHOLDER -->
```

### Native Banner — Below Hero National Stats
```html
<!-- TODO: Adsterra Native Banner — below hero price display -->
<div id="adsterra-native-banner" class="my-6 w-full">
  {/* ADSTERRA_NATIVE_BANNER_PLACEHOLDER */}
</div>
```

### Display Banner — Above Rankings Table
```html
<!-- TODO: Adsterra Display Banner 728x90 / 320x50 -->
<div id="adsterra-display-banner" class="my-8 flex justify-center">
  {/* ADSTERRA_DISPLAY_BANNER_PLACEHOLDER */}
</div>
```

---

## 9. Google Sheets Webhook

**Trigger:** page_view, state_select, grade_filter, chart_interact, table_sort

### Payload Schema
```json
{
  "event": "page_view | state_select | grade_filter | chart_interact | table_sort",
  "state": "california",
  "grade": "regular",
  "locale": "en",
  "timestamp": "2026-04-13T12:00:00Z",
  "page": "/states/california"
}
```

### Apps Script (Google Sheets)
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("interactions");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(), data.event, data.state,
    data.grade, data.locale, data.page
  ]);
  return ContentService.createTextOutput("OK");
}
```

---

## 10. Visitor Counter

**Placement:** Footer, subtle center or right text
**Storage:** Upstash Redis free tier

```tsx
// components/VisitorCounter.tsx
// Text: "Today: 1,024 | Total: 52,819"
// API: GET /api/visitor-count
//      POST /api/visitor-count (once per session)
```

---

## 11. Milestones & Git Strategy

### Milestone 1 — Scaffold
- Next.js 14 + Tailwind + Chart.js + next-intl
- `gh repo create taeshin11/gas-price-scout --public`
- Harness files
- **Commit:** `feat: scaffold Next.js with Chart.js and i18n`
- `git push origin main`

### Milestone 2 — Data Layer
- EIA API fetcher (`lib/eia.ts`)
- Fallback JSON parser
- Type definitions (`types/gas.ts`)
- `data/states.json`, `data/cities.json`, `data/gas-prices-fallback.json`
- **Commit:** `feat: data layer — EIA API fetcher and static fallback`
- `git push origin main`

### Milestone 3 — Homepage
- PriceHero component
- TrendChart (national 12-week)
- StateRankings table
- GradeSelector tabs
- Adsterra placeholders
- **Commit:** `feat: homepage with national dashboard and state rankings`
- `git push origin main`

### Milestone 4 — Dynamic Pages
- `/states/[state]` — state detail with city estimates
- `/cities/[city-state]` — city pages
- `/grades/[grade]` — grade rankings
- ChoroplethMap component (SVG)
- **Commit:** `feat: state, city, and grade pages with map`
- `git push origin main`

### Milestone 5 — SEO Layer
- next-sitemap (all 50 states + grades + top 100 cities)
- JSON-LD schema (Dataset, FAQPage)
- hreflang tags
- **Commit:** `feat: SEO — sitemap, schema.org Dataset, hreflang`
- `git push origin main`

### Milestone 6 — i18n
- 8 locale translation files
- Locale switcher
- **Commit:** `feat: i18n — 8 locales`
- `git push origin main`

### Milestone 7 — Integrations
- Google Sheets webhook
- Visitor counter
- Vercel Analytics
- **Commit:** `feat: webhook, visitor counter, analytics`
- `git push origin main`

### Milestone 8 — Deploy
- `npx vercel --prod`
- Verify EIA API key in Vercel env vars
- ISR smoke test (confirm revalidation)
- **Commit:** `chore: production deploy verified`
- `git push origin main`

---

## 12. File Structure

```
gas-price-scout/
├── PRD.md
├── feature_list.json
├── claude-progress.txt
├── init.sh
├── research_history/
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   └── us-states.svg        # choropleth base map
├── data/
│   ├── gas-prices-fallback.json
│   ├── states.json
│   ├── cities.json
│   └── grade-descriptions.json
├── messages/
│   ├── en.json  ├── ko.json  ├── ja.json  ├── zh.json
│   ├── es.json  ├── fr.json  ├── de.json  └── pt.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── states/[state]/page.tsx
│   │   ├── cities/[city-state]/page.tsx
│   │   └── grades/[grade]/page.tsx
│   └── api/
│       └── visitor-count/route.ts
├── components/
│   ├── layout/Header.tsx
│   ├── layout/Footer.tsx
│   ├── layout/LocaleSwitcher.tsx
│   ├── prices/PriceHero.tsx
│   ├── prices/PriceBadge.tsx
│   ├── prices/TrendChart.tsx
│   ├── prices/StateRankings.tsx
│   ├── prices/GradeSelector.tsx
│   ├── map/ChoroplethMap.tsx
│   ├── ads/SocialBar.tsx
│   ├── ads/NativeBanner.tsx
│   ├── ads/DisplayBanner.tsx
│   └── VisitorCounter.tsx
├── lib/
│   ├── eia.ts
│   ├── fallback.ts
│   ├── webhook.ts
│   └── utils.ts
├── types/
│   └── gas.ts
├── next.config.js
├── next-sitemap.config.js
├── tailwind.config.js
└── package.json
```

---

## 13. Harness Spec

### `feature_list.json`
```json
{
  "project": "gas-price-scout",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "National dashboard with trend chart", "status": "pending" },
    { "id": "F02", "name": "State pages", "status": "pending" },
    { "id": "F03", "name": "City pages", "status": "pending" },
    { "id": "F04", "name": "Grade pages", "status": "pending" },
    { "id": "F05", "name": "US choropleth map", "status": "pending" },
    { "id": "F06", "name": "Trend chart 12 weeks", "status": "pending" },
    { "id": "F07", "name": "State rankings table", "status": "pending" },
    { "id": "F08", "name": "i18n 8 locales", "status": "pending" },
    { "id": "F09", "name": "Visitor counter", "status": "pending" },
    { "id": "F10", "name": "Google Sheets webhook", "status": "pending" },
    { "id": "F11", "name": "Adsterra ads", "status": "pending" },
    { "id": "F12", "name": "SEO sitemap hreflang schema", "status": "pending" },
    { "id": "F13", "name": "ISR 7-day revalidation", "status": "pending" },
    { "id": "F14", "name": "Research history logs", "status": "pending" }
  ]
}
```

### `claude-progress.txt`
```
# GasPriceScout — Claude Build Progress

MILESTONE_1=pending
MILESTONE_2=pending
MILESTONE_3=pending
MILESTONE_4=pending
MILESTONE_5=pending
MILESTONE_6=pending
MILESTONE_7=pending
MILESTONE_8=pending
LAST_UPDATED=
DEPLOY_URL=
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== GasPriceScout Init ==="

npx create-next-app@latest . \
  --typescript --tailwind --eslint \
  --app --src-dir=false --import-alias="@/*" --no-git

npm install next-intl next-sitemap chart.js react-chartjs-2 \
  @vercel/analytics @upstash/redis

gh repo create taeshin11/gas-price-scout \
  --public --source=. --remote=origin --push

mkdir -p research_history data messages \
  components/layout components/prices \
  components/map components/ads \
  lib types app/api/visitor-count

git add .
git commit -m "chore: initial scaffold"
git push origin main

echo "=== Init complete ==="
```

---

## 14. Environment Variables

```env
EIA_API_KEY=your_free_eia_key_here
NEXT_PUBLIC_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/[ID]/exec
NEXT_PUBLIC_SITE_URL=https://gas-price-scout.vercel.app
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 15. EIA Data Processing

```typescript
// lib/eia.ts
// EIA region codes → state names mapping
const EIA_STATE_MAP: Record<string, string> = {
  "R10": "New England",
  "R20": "Central Atlantic",
  "SCA": "California",
  "SCO": "Colorado",
  // ... all 50 states + PADD regions
};

// Fetch weekly prices for all states
export async function fetchStateGasPrices(): Promise<StatePrices[]> {
  const url = `https://api.eia.gov/v2/petroleum/pri/gnd/data/` +
    `?api_key=${process.env.EIA_API_KEY}` +
    `&frequency=weekly&data[0]=value` +
    `&facets[product][]=EPM0` + // Regular
    `&length=52`; // 52 weeks history
  // ... parse and return
}
```

**EIA Free Tier:** Register at eia.gov/opendata — unlimited requests, no cost.

**Programmatic SEO target:** 700+ indexable pages (50 states × 5 grades + 500 cities + national pages).
