# Figma Notes — Plot Twist

Source: https://www.figma.com/design/7ixrh2Slj3k2rQPxrqZjAi/Plot-Twist----UX---UI-Design?node-id=3-3
Page: "3 - Final UI & Prototype" (node 3:3). Notes written 2026-11-17.

**Status: partial.** Only 3 of 11 frames were read from screenshots (01A, 01B, 02). Frame 02A failed
(Figma MCP call limit on Starter plan), so nothing is known about it. Nothing here comes from
design variables (`get_variable_defs` was not called).

**Confidence key:** values in quotes or hex codes are read straight from the design. Anything
marked *(est.)* is estimated by eye from a screenshot (fonts, most colors, spacing) and must be
checked against Figma before use.

## All frames on the page (from metadata)

| Node id | Name | Size |
|---|---|---|
| 45:639 | 01A — Explore Dashboard | 1440×1000 |
| 83:107 | 01B — Explore Dashboard / Empty State | 1440×1000 |
| 88:84 | 02 — Create Experiment! | 1440×1550 |
| 123:921 | 02A — Create Experiment!/AI suggestionspage | 1440×1550 |
| 138:1183 | 02B — Create Experiment!/AI suggestions page - selected | 1440×1550 |
| 138:1400 | 02C — Create Experiment!/AI Suggestions added | 1440×1629 |
| 93:352 | 03-Preview/Desktop | 1440×1200 |
| 139:1568 | 03-Preview/Desktop - Ai Review | 1440×1200 |
| 98:28 | 03-Preview/Mobile | 1440×1200 (named Mobile, frame is desktop-sized) |
| 105:183 | 04-Insights/Empty | 1440×1000 |
| 105:262 | 04-Insights/Demo Results | 1456×3300 |

Read so far: 45:639, 83:107, 88:84. Not read: the other 8, including 123:921 (02A).

## Shared: page header and bookshelf nav (seen on 01A, 01B, 02)

- Header band is full width (1440), about 195px tall, very light cream background *(est. ~#FFFBF5)*.
  Metadata: "Header — Background" rounded rectangle 1440×195.
- Logo at top-left: a round beige/tan circle *(est. ~#EBDDC3)*, about 140px across, containing a
  hand-drawn black open-book icon with three short colored rays above it (blue, coral, green).
  Beside it, the wordmark "Plot Twist" on two lines, large bold serif, near-black. Metadata: logo
  instance about 276×139 at x=31, y=31.
- **Bookshelf nav**, centered-right (about x=615–1145). Four "books" stand on a tan wooden shelf line
  *(shelf est. ~#D9A86C)*. Each book is a tall rounded card (about 106×117) with a darker spine
  strip on its left edge, a line icon, a label, and a thin underline below the label. Metadata
  shows the nav frame at 530×167 and the first book at 106×117.
  - **Explore:** yellow/gold *(est. ~#F2C96B, spine ~#D9A93A)*, open-book icon.
  - **Create:** coral/orange-red *(est. ~#E46D52, spine ~#B8452E)*, plus-in-circle icon.
  - **Preview:** lavender/periwinkle *(est. ~#A9A3D8, spine ~#7B74C2)*, eye-in-diamond icon.
  - **Insights:** sage green *(est. ~#849C82, spine ~#5E7A5C)*, bar-chart icon.
  - Label: sans-serif, medium weight, ~15–16px *(est.)*, dark text.
  - **"ACTIVE" badge:** small dark-blue pill *(est. ~#3155A4)* with white uppercase text, ~12px
    bold *(est.)*, floating above the current book. On 01A/01B it sits over Explore; on 02 it sits
    over Create. So the active page is shown by moving this badge, not by recoloring a book.
- Page body below the header: warm light beige background *(est. ~#F3EFE7)*.

## Screen 01A — Explore Dashboard (45:639)

Title and subtitle:
- H1: "Your Experiment Library", serif, bold, ~36px *(est.)*, near-black.
- Subtitle: "All your experiments, one place to explore", sans, ~16px *(est.)*, muted gray-brown.

Toolbar row (one line, full content width):
- Search input, wide, white, thin light border, rounded. Search (magnifier) icon on the left,
  placeholder "Search Experiments....".
- Status filter dropdown, white, label "All Statuses" with a chevron.
- Sort dropdown, white, label "Newest First" with a chevron.
- Primary button "+ New Experiment": solid blue *(est. ~#3155A4)*, white text, bold-ish sans,
  rounded ~8px *(est.)*, about 220×48.

Experiment cards: 2×2 grid, ~650px wide each, ~240px tall *(est.)*, about 30px gap *(est.)*. White,
rounded ~12px *(est.)*, soft drop shadow.
- Top-left: gold open-book icon *(est. ~#C99A2E)*.
- Top-right: a status pill, then a "⋯" menu button (small rounded square, beige background).
- Title: sans, semibold, ~20px *(est.)*, near-black, e.g. "Bookish Bunny — Fall Campaign".
- Meta line: sans, ~15px *(est.)*, muted gray, "12 variations · Sample".
- A thin gold/tan divider line across the card (hand-drawn look, slightly wavy).
- Bottom-right link: "View Variations →" in blue *(est. ~#3155A4)*, semibold, with an arrow icon.

The four sample cards (name, variations, status):
1. Bookish Bunny — Fall Campaign, 12 variations, **Draft**
2. Bookish Bunny — Holiday Campaign, 8 variations, **Running**
3. Bookish Bunny — Winter Campaign, 6 variations, **Completed**
4. Bookish Bunny — Spring Campaign, 9 variations, **Paused**

Status pills (rounded full, icon + label, ~14px text *(est.)*):
- **Draft:** light gray background, dark gray text, pencil icon.
- **Running:** pale green background, dark green text, play-in-circle icon.
- **Completed:** pale blue background, blue text, check-in-circle icon.
- **Paused:** pale pink/red background, dark red text, pause-in-circle icon.

## Screen 01B — Explore Dashboard / Empty State (83:107)

Same header, nav and page title "Your Experiment Library". The subtitle changes to
"Every great experiment starts with an idea."

Body: one centered white card (about 780px wide *(est.)*, large rounded corners ~20px *(est.)*):
- Large pale-yellow circle *(est. ~#FFF6DA)* holding a gold open-book icon.
- Heading (serif, ~20px *(est.)*): "Your shelf is waiting for its first story."
- Body text (sans, semibold, ~14px *(est.)*, muted brown-gray): "Create your first experiment to
  start exploring different headlines, buttons, and colors."
- Primary button: "+ Create First Experiment" (blue, white text, rounded).

The toolbar (search, filters, New Experiment) is not shown in the empty state.

## Screen 02 — Create Experiment! (88:84)

Header and nav as above, "ACTIVE" over Create.
- H1: "Create an Experiment" (serif, bold, ~36px *(est.)*).
- Subtitle: "Every great experiment starts with an idea."

Layout: two columns. Left, about 960px, a stack of 4 white section cards. Right, about 370px, a
summary card that sits level with the first card. Cards are white, rounded ~12–16px *(est.)*, with a
thin light border/soft shadow. Section titles are sans, semibold, ~24px *(est.)*, formatted
"NN — Title". Inputs are white with a light gray border, rounded ~8px *(est.)*, ~48px tall,
placeholder text in gray.

**Section 01 — Experiment Details**
- Label "Experiment Name *" (required). Placeholder "e.g., Bookish Bunny — Summer Campaign".
- Label "Description (optional)". Multi-line textarea, placeholder "What would you like to test?".

**Section 02 — Headline Options**
- Helper text: "Add up to four headlines to compare".
- Sample rows: "Discover your next favorite read", "Your next great story starts here".
- Each row is a full-width text input with an "X" remove icon at the right.
- Bottom-left text link: "+ Add Headline" (blue, small, semibold).
- Bottom-right button: "✨ Suggest Headlines with AI" (pale lavender-blue background, blue text,
  yellow sparkle icon, rounded). AI: to be decided.

**Section 03 — CTA Button Options**
- Helper text: "Try different button messages".
- Sample rows: "Explore Books", "Find My Next Read". Same row style with "X".
- "+ Add Button Text" link. "✨ Suggest CTAs with AI" button. AI: to be decided.

**Section 04 — Accent Color Options**
- Helper text: "Choose the colors to test on the landing page."
- Rows: a square rounded color swatch (~48px) plus a hex text input plus "X". Sample values:
  **#3155A4** (blue), **#E46D52** (coral), **#849C82** (sage green).
- "+ Add Color" link. "✨ Suggest Colors with AI" button. AI: to be decided.

**Experiment Summary card (right column)**
- Title "Experiment Summary" (serif, ~24px *(est.)*), divider line.
- Three rows, each with a small colored rounded icon tile, a label and a count at the right:
  - Headlines — lavender tile with a "T" icon — 2
  - Button texts — pale pink tile with a cursor icon — 2
  - Accent colors — pale green tile with a palette icon — 3
- "Total Variations" (sans, semibold), then a big blue number **12** (~48px bold *(est.)*), then
  "2 × 2 × 3 = combinations" shown as "2 × 2 × 3 combinations" in small gray text.
- Info box (bordered, rounded, info icon): "We'll create every combination of your headlines,
  button texts, and colors."
- Full-width primary button: "Generate Variations →" (blue, white text, ~20px *(est.)*).

Observation: the design allows up to four headlines. The limits for CTAs and colors were not
visible in the text I read. The old SPEC.md said 1–4 each.

## Screen 02A — AI suggestions page (123:921)

Not read. Figma MCP call limit was reached before this frame could be fetched. Only its name
and size (1440×1550) are known. The related frames are 02B ("AI suggestions page - selected") and
02C ("AI Suggestions added", 1440×1629, slightly taller, which hints that suggested items get added
to the form).

## Design system observations so far *(all estimates unless a hex is shown)*

**Colors**
- Primary blue: ~#3155A4 (confirmed as a swatch value in the Accent Colors sample)
- Coral: #E46D52 (confirmed swatch value), also the Create book
- Sage green: #849C82 (confirmed swatch value), also the Insights book
- Gold/yellow: ~#F2C96B (Explore book), ~#C99A2E (icons)
- Lavender: ~#A9A3D8 (Preview book)
- Header background: very light cream ~#FFFBF5. Page background: beige ~#F3EFE7. Cards: white.
- Text: near-black headings; muted gray-brown for subtitles and helper text.
- Status pill colors: gray (Draft), green (Running), blue (Completed), red/pink (Paused).
- Contrast has not been checked. The white-on-blue button text looks fine, but pale pill
  backgrounds and gray helper text need a WCAG AA check.

**Fonts**
- Headings and brand: a bookish serif, bold. Looks like Libre Baskerville or similar. *(est.)*
- Body, labels, buttons: a clean sans-serif, looks like Inter. *(est.)*
- Rough sizes: H1 ~36px, section titles ~24px, card titles ~20px, body ~14–16px, big stat ~48px.

**Components seen:** bookshelf nav with "ACTIVE" badge, page header, search input, dropdown,
primary button, text link button, AI suggest button, status pill (4 types), experiment card,
"⋯" menu button, empty-state card, numbered section card, text input, textarea, removable list row,
color swatch input, summary row with icon tile, info box.

**Spacing:** page content starts about 55px from the left edge. Card padding about 35px *(est.)*.
Gaps between cards about 20–30px *(est.)*.

## Flow seen so far

Explore (list of experiments, or empty state) → "New Experiment" / "Create First Experiment" →
Create an Experiment → "Generate Variations →" → (presumably Preview, not yet confirmed).
Card link "View Variations →" presumably also goes to Preview. The nav books (Explore, Create,
Preview, Insights) are the top-level navigation.

## To do

- Read the remaining 8 frames: 02A, 02B, 02C, 03 Desktop, 03 Desktop AI Review, 03 Mobile,
  04 Empty, 04 Demo Results.
- Pull real colors, fonts and spacing from Figma variables/styles (`get_variable_defs`) to replace
  every *(est.)* value above.
