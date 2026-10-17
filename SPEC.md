# 🔀 Plot Twist — Product Spec

> *Find out which version your readers love.*

## What it is

Plot Twist is a landing-page testing tool for a marketing team. A marketer enters a few
headline, button, and color options. Plot Twist creates every combination as a real landing
page, shows each visitor one version, counts views and button clicks, and shows which
version wins.

The demo uses a made-up book subscription brand called **Chapter Box**. Do not use any real
company's name, logo, or branding.

## Who uses it

| User | What they do |
|---|---|
| **Marketer** | Creates a test, previews versions, starts/pauses/stops it, reads results |
| **Visitor** | Sees one version of the landing page and may click the button |

## Features

### Round 1 — Create and see versions
1. **🧩 Mix & Match Builder**
   - Marketer creates a test with a name.
   - Adds 1–4 options each for: headline, button text, accent color.
   - App generates every combination (e.g. 2 × 2 × 2 = 8 variants).
   - Each variant gets a short label: A, B, C…
2. **👀 Sneak Peek**
   - Preview any variant as a full landing page.
   - Toggle between desktop and phone width.
   - Arrow buttons to flip between variants.

### Round 2 — Make it work for real visitors
3. **🎲 Fair Shuffle**
   - Public landing page at `/t/:testId`.
   - Each new visitor is randomly assigned one variant.
   - Returning visitors see the same variant (remembered in the browser).
4. **📍 Click Counter**
   - Record a "view" event when the page loads.
   - Record a "click" event when the CTA button is clicked.
   - Each event stores: testId, variantId, type, timestamp.

### Round 3 — Show the results
5. **👑 The Pageant** (results dashboard)
   - Table per variant: views, clicks, click rate.
   - Winning variant highlighted with a crown.
   - Simple bar chart of click rates.
6. **🎯 Confidence Meter**
   - Label per test: **Too early** / **Looking good** / **Clear winner**.
   - "Too early" if any variant has fewer than 30 views.
   - Use a simple two-proportion z-test between the top two variants for the other labels.

### Round 4 — Make it professional
7. **⏯️ Start / Pause / Stop**
   - Test status: draft → running → paused → ended.
   - Only running tests record events.
   - Ending a test lets the marketer mark the winner.
8. **✅ Auto-Checked**
   - Unit tests (Vitest) for combination generation and the confidence math.
   - Playwright end-to-end tests for: creating a test, visitor assignment stays the same
     on reload, and clicking the CTA increases the count.

### Round 5 — Make it impressive
9. **📖 Built-with-Claude Story** — a README section explaining how the app was built
   with Claude Code: key prompts, what was accepted, what was fixed by hand, time spent.
10. **🎨 Figma to Page** *(bonus)* — turn a Figma design into a new landing-page template.

## Data

**Round 1:** store tests in the browser (localStorage) so we can build without a backend.
**Round 2 onward:** move tests and events to Supabase (free tier).

```
Test     { id, name, status, createdAt, options: { headlines[], ctas[], colors[] } }
Variant  { id, testId, label, headline, cta, color }
Event    { id, testId, variantId, type: "view" | "click", createdAt }
```

## Screens

| Route | Screen |
|---|---|
| `/` | List of tests |
| `/tests/new` | Mix & Match Builder |
| `/tests/:id/preview` | Sneak Peek |
| `/tests/:id/results` | The Pageant |
| `/t/:id` | Public landing page for visitors |

## Out of scope

- User accounts or login
- Real payments or sign-ups
- Images uploaded by users
