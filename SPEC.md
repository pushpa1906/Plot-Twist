# 🔀 Plot Twist — Product Spec (v2, from the Figma design)

> Find out which version your readers love.

**Source of truth:** the Figma design, exported to `design/`. Exact colors, fonts and sizes are in
`design/tokens.md`. Ignore `design/process/` (early wireframes, not the final design).

## What it is

Plot Twist helps a marketing team test landing-page ideas. A marketer creates an experiment with a
few headlines, CTA button texts and accent colors. Plot Twist builds every combination as a real
landing page, lets the marketer preview each one on desktop and mobile, and shows how the
variations perform.

The landing pages belong to **Bookish Bunny**, a made-up book subscription brand. Never use a real
company's name, logo or branding.

## Screens

| # | Screen | Route | Figma frame |
|---|---|---|---|
| 01A | Explore — experiment library | `/` | `01A — Explore Dashboard` |
| 01B | Explore — empty state | `/` (no experiments) | `01B — Explore Dashboard / Empty State` |
| 02 | Create an Experiment | `/create` | `02 — Create Experiment` |
| 02A–C | AI Suggestions modal | `/create` (modal) | `02A`, `02B`, `02C` |
| — | Choose an experiment (Preview / Insights with no id) | `/preview`, `/insights` | not in Figma |
| 03 | Preview Variations — desktop | `/preview/:id` | `03-Preview / Desktop` |
| 03 | Preview Variations — mobile | `/preview/:id` | `03-Preview / Mobile` |
| 03 | AI Design Review modal | `/preview/:id` (modal) | `03-Preview / Desktop - AI Review` |
| 04 | Experiment Insights — empty | `/insights/:id` | `04-Insights / Empty` |
| 04 | Experiment Insights — demo results | `/insights/:id?demo=1` | `04-Insights / Demo Results` |

## Shared layout (every screen)

**Header** (background `paper`, full width):
- Left: Plot Twist logo (open book with three colored rays inside a `logo-circle` circle) and the
  two-line "Plot Twist" wordmark in Libre Baskerville. The logo is **not clickable** (matches the
  prototype). Render it as an image with alt text "Plot Twist", not as a link or button.
- Center: **Bookshelf navigation**, four books standing on a wooden shelf:
  Explore (Butter), Create (Tomato), Preview (Periwinkle), Insights (Sage). Each book has a darker
  spine on the left, an icon, a label and a thin underline.
- The current page's book has a blue **ACTIVE** pill above it.

**Page title area:** serif page title, secondary-color subtitle below it.

**Page background:** `ivory`.

## 01A — Explore: "Your Experiment Library"

- Title "Your Experiment Library", subtitle "All your experiments, one place to explore".
- Toolbar:
  - Search box with a magnifier icon, placeholder "Search Experiments…". Filters by name as you type.
  - "All Statuses" dropdown: All, Draft, Running, Completed, Paused.
  - "Newest First" dropdown: Newest First, Oldest First, Name A–Z.
  - "+ New Experiment" primary button → Create.
- 2-column grid of experiment cards (1 column on small screens). Each card:
  - Gold open-book icon (top left).
  - Status badge and a "⋯" more button (top right). The "⋯" menu has: **Preview**, **Insights**,
    **Duplicate**, **Delete**. Delete asks for confirmation first. The menu is keyboard accessible
    (ARIA menu button pattern: Enter/Space opens, arrow keys move, Esc closes).
  - Title, e.g. "Bookish Bunny — Fall Campaign".
  - Metadata: "12 variations · Sample" (the word "Sample" only on demo experiments).
  - Gold divider line.
  - "View Variations →" link → Preview for that experiment.
- Sample data shown in the design:

| Name | Status | Variations |
|---|---|---|
| Bookish Bunny — Fall Campaign | Draft | 12 |
| Bookish Bunny — Holiday Campaign | Running | 8 |
| Bookish Bunny — Winter Campaign | Completed | 6 |
| Bookish Bunny — Spring Campaign | Paused | 9 |

## 01B — Explore: empty state

- Same header and title; subtitle "Every great experiment starts with an idea."
- Large white card, centered: gold book icon in a `gold-tint` circle, serif line
  "Your shelf is waiting for its first story.", text "Create your first experiment to start
  exploring different headlines, buttons, and colors.", and a "+ Create First Experiment" button → Create.

## 02 — Create an Experiment

Two columns: form on the left (about 70%), sticky **Experiment Summary** on the right.
On small screens the summary moves below the form.

Title "Create an Experiment", subtitle "Every great experiment starts with an idea."

**Section 01 — Experiment Details**
- "Experiment Name *" (required), placeholder "e.g., Bookish Bunny — Summer Campaign".
- "Description (optional)", multi-line, placeholder "What would you like to test?"

**Section 02 — Headline Options** — "Add up to four headlines to compare"
- One text input per headline with an × remove button. 1–4 headlines.
- "+ Add Headline" link and a "✨ Suggest Headlines with AI" soft button.

**Section 03 — CTA Button Options** — "Try different button messages"
- Same pattern. 1–4 button texts. "+ Add Button Text", "✨ Suggest CTAs with AI".

**Section 04 — Accent Color Options** — "Choose the colors to test on the landing page."
- Each row: a color swatch + a hex input (e.g. `#3155A4`) + × remove. 1–4 colors.
- **Both ways to pick a color, kept in sync:**
  - Clicking the swatch opens the browser's native color picker (`<input type="color">`).
  - Typing a hex code in the text input updates the swatch.
- Invalid hex shows an error. The swatch needs an accessible label, e.g. "Pick color 1".
- "+ Add Color", "✨ Suggest Colors with AI".

**Experiment Summary card** (`paper` background)
- Rows with small tinted icon squares: Headlines (count), Button texts (count), Accent colors (count).
- "Total Variations" with a large cobalt number, e.g. **12**, and "2 × 2 × 3 combinations" below it.
- Info box: "We'll create every combination of your headlines, button texts, and colors."
- "Generate Variations →" primary button. Saves the experiment as **Draft** and opens Preview.

**Validation:** name required; every option non-empty; no duplicates within a list; 1–4 per list;
valid hex colors. Show errors next to the field, and keep the button usable so errors appear on click.

## 02A–C — AI Suggestions modal

Opens from any "Suggest … with AI" button, with the matching tab selected.
- Title "✦ AI Suggestions", text "Explore AI-generated ideas and select the ones you'd like to add to
  your experiment.", close × button.
- Tabs: Headlines, CTAs, Colors (selected tab is a filled cobalt button).
- 3 suggestion rows. Each row: a round checkbox, the suggestion text, a copy button.
- Footer: "↻ Regenerate" (outline pill) and "Add Selected (n)" (charcoal pill; n = number checked).
- 02B: a checked row shows a filled check.
- 02C: after "Add Selected", the modal closes, the suggestion is added to its list, and the summary
  updates (example: 3 headlines → 3 × 2 × 3 = 18).
- Adding must respect the limit of 4 per list.
- Sample headline suggestions from the design: "Discover a story worth staying up for",
  "Your next favorite book is waiting", "Turn the page to something new".

**AI: to be decided** (real Claude API, simulated, or hybrid). Until decided, suggestions come from a
local list of sample ideas, labeled honestly, and "Regenerate" shows a different set.

## 03 — Preview Variations

Title "Preview Variations", subtitle "Explore every version of your landing page before launching."
Top right: experiment name, "12 generated variations", status badge.

**Left: Variants panel**
- "Variants" heading, "12 Total".
- Scrollable list of variant cards: "Variant 01", the combination as "Headline - CTA", and a color dot.
- Selected card: `cobalt-tint-2` background and a cobalt border.

**Right: Variation panel**
- Heading "Variation 01".
- Buttons: "✨ Review Design with AI", Desktop / Mobile toggle (selected is filled cobalt),
  full-screen button (expand icon).
- Preview area (`ivory`): the **Bookish Bunny landing page**:
  - "Bookish Bunny" serif wordmark with a book icon on the right, thin line under it.
  - The variant's headline (large, bold, centered).
  - "Curated stories delivered to your door, one book at a time."
  - CTA button with the variant's text and accent color; text color automatically black or white.
- Mobile: the same page inside a narrow phone-width frame (about 320px), centered.
- **Current Combination** table: Headline, CTA, Accent (a bar in the accent color).

**Variant order** (matches the Insights table): color changes fastest, then headline, then CTA.
Example with 2 headlines × 2 CTAs × 3 colors:
V01 = H1 + CTA1 + Color1, V02 = H1 + CTA1 + Color2, V03 = H1 + CTA1 + Color3,
V04 = H2 + CTA1 + Color1 … V07 = H1 + CTA2 + Color1 … V12 = H2 + CTA2 + Color3.
Labels are two-digit numbers: "Variant 01" in lists, "V01" in charts and tables.

## 03 — AI Design Review modal

- Title "✦ AI Design Review", text "Explore ways to improve your landing page's clarity, visual
  hierarchy, and accessibility.", close ×.
- Tags showing what is reviewed: "Variation 01", "Desktop".
- Three cards with an icon, a title and one suggestion:
  - **Visual Hierarchy**, e.g. "Make your headline more prominent so visitors immediately
    understand the main message."
  - **CTA Clarity**, e.g. "Try "Find My Next Read" to make the button more specific and engaging."
  - **Accessibility**, e.g. "Check color contrast and visible keyboard focus before publishing."
- Buttons: "Review Again" (outline), "Done" (primary).

**AI: to be decided.** The Accessibility card can use real checks without AI (the contrast of the
CTA text against the accent color, using the WCAG formula already in `src/lib/contrast.ts`).

## 04 — Experiment Insights

Title "Experiment Insights", subtitle "Explore how your landing page variations perform."

**Selected experiment card:** label "SELECTED EXPERIMENT", experiment name, a dropdown chevron to
switch experiments, status badge, "12 variations generated".

**Empty state:** chart icon in a `gold-tint` circle, serif "No experiment results yet",
"Your 12 landing page variations are ready, but no performance data has been collected yet.",
"View Demo Results" button, small note "Preview sample analytics using fictional visitor and click data."

**Demo results:**
- Notice "Simulated data for demonstration only" and an "Exit Demo" link (returns to the empty state).
- Three stat cards: Total Views (1,200 · "100 per variation"), Total CTA Clicks (216 · "Across all 12
  variations"), CTA Click Rate (18.0% · "216 clicks ÷ 1,200 views").
- **Variation Performance** bar chart, "CTA click rate by variation": one bar per variation
  (V01–V12), y-axis 0–30%, bars cobalt, the highest bar sage. Caption "Simulated demo data · 100 views
  per variation".
- **AI Insights Summary** card with a "Demo Analysis" badge: Top Performing Variation,
  Key Observation, Recommended Next Step.
- **All Variations** table: Variant, Headline / CTA, Color dot, Views, Clicks, rate. The best row has a
  "Highest CTR" tag. Total row. Footnote: "All results are fictional. V12 has the highest simulated
  click rate, not a statistically verified winning variation."

**Demo data** for the Fall Campaign (100 views each), clicks V01–V12:
12, 25, 18, 17, 21, 16, 14, 19, 15, 20, 13, 26.
For other experiments, generate simulated numbers the same way every time (seeded by the
experiment id), so the page does not change on reload.

**AI Insights Summary** can be written from the numbers with simple rules (no API needed), for
example the top variation, its combination, and a sample-size warning. **AI: to be decided** whether
to add a real Claude summary later.

## Data

Stored in the browser (localStorage), behind `src/lib/storage.ts`.

```
Experiment { id, name, description?, status: "draft" | "running" | "completed" | "paused",
             createdAt, isSample, options: { headlines[], ctas[], colors[] } }
Variant    { id, experimentId, number, headline, cta, color }   // generated, not stored
```

### Demo experiments

The four Bookish Bunny experiments are **demo content**, kept separate from the user's own work:
- They load on the first visit (marked `isSample`) so a reviewer sees a full library right away.
- Each shows "Sample" in its metadata.
- Explore has a small "Demo experiments" control: **"Remove demo experiments"** when they are
  showing, **"Load demo experiments"** when they are not. It never touches the user's own experiments.
- The empty state (01B) also offers "Load demo experiments" as a secondary button under
  "Create First Experiment".
- Removing the demo is remembered, so it doesn't come back on reload.

If there are no experiments at all, Explore shows the empty state.

## Choosing an experiment (Preview and Insights)

When Preview or Insights opens **without** an experiment in the URL (for example from the
bookshelf nav), the page asks which one:
- Title of the page as usual, then a "Choose an experiment" card listing experiments (name, status
  badge, variation count). Picking one opens `/preview/:id` or `/insights/:id`.
- The list is keyboard accessible (arrow keys move, Enter opens).
- If there are no experiments, show a short message and a "Create an Experiment" button.

The selected-experiment dropdown on Insights uses the same list.

## Accessibility (required)

- Bookshelf nav is a `<nav>` with links; the current page uses `aria-current="page"`.
- Modals: focus moves into the modal, Tab stays inside, Esc closes, focus returns to the button.
- Tabs in the AI Suggestions modal follow the ARIA tabs pattern (arrow keys switch tabs).
- Keep existing keyboard support: arrow keys between option rows, ← → between variants.
- Visible focus ring in cobalt on everything.
- AA contrast. Placeholders use `#716A60`, not `#888888`.
- Respect `prefers-reduced-motion`.
- Works at 375px wide: no horizontal scrolling, tap targets at least 44px.

## Later (only if usage allows)

- Real visitor page at `/t/:id` with random assignment and real view/click counting (Supabase).
- Start / Pause / Complete controls for an experiment.
- Real AI features through a serverless function, with a spending cap.

## Out of scope

User accounts, real payments, image uploads.
