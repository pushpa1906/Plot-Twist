# Plot Twist — Design Tokens

Source: Figma file "Plot Twist — UX & UI Design", page 2 (Design System) and page 3 (Final UI).
Desktop frames are 1440px wide.

How to read this file:
- **(label)** = written as text in the Figma design system. Exact.
- **(sampled)** = read from the exported PNG pixels. Exact for flat colors, but not named in Figma.
- **(est.)** = estimated from the image. Check in Figma and correct if needed.

## Brand colors (label)

| Token | Name | Hex | Used for |
|---|---|---|---|
| `cobalt` | Cobalt Blue | `#3155A4` | Primary buttons, links, active pill, focus ring, selected states, main chart bars |
| `tomato` | Tomato | `#E46D52` | "Create" book, accent option |
| `butter` | Butter Yellow | `#F2C96B` | "Explore" book |
| `sage` | Sage | `#849C82` | "Insights" book, highest bar in chart, input icons |
| `periwinkle` | Periwinkle | `#A7A5D6` | "Preview" book, soft button icon |

## Neutrals

| Token | Hex | Source | Used for |
|---|---|---|---|
| `ivory` | `#F5F0E7` | label | Page background |
| `charcoal` | `#292929` | label | Primary text, dark buttons ("Add Selected"), icons |
| `paper` | `#FFFCF7` | sampled | Header bar, modals, Experiment Summary card, AI Insights card |
| `white` | `#FFFFFF` | sampled | Cards, inputs |
| `text-secondary` | `#716A60` | sampled | Subtitles, metadata, helper text |
| `border` | `#CCC8C0` | sampled | Card borders |
| `border-soft` | `#E2D8CA` | sampled | Search box, variant cards, light dividers |
| `input-border` | `#C9C3B9` | sampled | Input default border |
| `placeholder` | `#888888` | sampled | Input placeholder (see accessibility note) |
| `gold` | `#C89F43` | sampled | Book icon on cards, card divider line, empty-state icon |
| `gold-tint` | `#FFF9E4` | sampled | Empty-state icon circle |
| `logo-circle` | `#EEDCC2` | sampled | Circle behind the logo |
| `overlay` | charcoal at ~30% (est.) | sampled `#B4B0AA` over ivory | Modal backdrop |

## Soft tints (sampled)

| Token | Hex | Used for |
|---|---|---|
| `cobalt-tint` | `#E9EDF8` | "Suggest … with AI" buttons, "Review Design with AI", "Demo Analysis" badge |
| `cobalt-tint-2` | `#F0F3FB` | Selected variant card background |
| `periwinkle-tint` | `#E6E4F8` | "Add another headline" soft button |
| `summary-icon-headline` | `#E8E5F5` | "T" icon square in Experiment Summary |
| `summary-icon-cta` | `#FBE4DF` | Cursor icon square |
| `summary-icon-color` | `#E3EDE1` | Palette icon square |

## Status badges (sampled)

| Status | Background | Text + icon | Icon |
|---|---|---|---|
| Draft | `#E8E8E8` | `#292929` | pencil |
| Running | `#DDEBDD` | `#365D3B` | play-circle |
| Completed | `#DFE9FF` | `#3155A4` | check-circle |
| Paused | `#FFE0DD` | `#8A3040` | pause-circle |
| Highest CTR tag | `#E5EFE4` | `#426B48` | none |

## Bookshelf navigation (sampled)

| Book | Cover | Spine (left edge) | Icon |
|---|---|---|---|
| Explore | `#F2C96B` | `#D6A94B` | open book |
| Create | `#E46D52` | `#B84E38` | plus-circle |
| Preview | `#A7A5D6` | `#7775AE` | eye |
| Insights | `#849C82` | `#668264` | bar chart |

- Book label and icon: `#292929`, Inter Semi Bold (est.).
- Thin underline under each label in the spine color.
- Shelf: top `#D5AD73`, front edge `#B88954`, soft drop shadow under the books.
- Active page: "ACTIVE" pill in `cobalt` with white uppercase text, sitting above the active book.

## Typography (label)

| Style | Font | Size | Weight | Used for |
|---|---|---|---|---|
| Display heading | Libre Baskerville | 48px | Bold | Expressive, book-inspired headings |
| Page heading | Inter | 40px | Bold | Main page titles (see note) |
| Section heading | Inter | 24px | Semi Bold | Headings inside forms and cards |
| Body | Inter | 16px | Regular | Descriptions and instructions |
| Small | Inter | 14px | Regular | Labels, hints, metadata |
| Button | Inter | 16px | Semi Bold | Action buttons |

**Note:** On the final screens, page titles ("Your Experiment Library", "Create an Experiment",
"Preview Variations", "Experiment Insights") and card titles ("Experiment Summary", "AI Suggestions",
"AI Design Review", "AI Insights Summary") use **Libre Baskerville Bold**, not Inter. The final screens
win. Decision needed: update the Typography frame, or switch the screens to Inter.

Logo wordmark "Plot Twist": Libre Baskerville Bold, two lines.
Demo brand wordmark "Bookish Bunny": Libre Baskerville Regular (est.).

Google Fonts: `Libre Baskerville` (400, 700) and `Inter` (400, 500, 600, 700).

## Shape and spacing (est. — confirm in Figma)

- Card radius: 12px (est.)
- Input radius: 8px (est.)
- Primary pill buttons (design system, e.g. "Create Experiment"): fully rounded (999px)
- Rectangular primary buttons on screens (e.g. "+ New Experiment", "Generate Variations"): 8px (est.)
- Status badges: fully rounded
- Card shadow: soft, low (est. `0 2px 6px rgba(41,41,41,0.08)`)
- Page side padding: 64px desktop (est.)
- Gap between cards: 24–32px (est.)
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64 (est.)

## Accessibility notes (checked with the WCAG contrast formula)

| Pair | Ratio | Result |
|---|---|---|
| Charcoal text on each book (lowest: Tomato) | 4.58 | Pass AA |
| Secondary text `#716A60` on ivory | 4.70 | Pass AA |
| White text on Cobalt buttons | 7.08 | Pass AA |
| Status badge text on badge backgrounds | 5.8–6.6 | Pass AA |
| Placeholder `#888888` on white | 3.54 | **Fails AA** — use `#716A60` for placeholders |
| White text on Tomato | 3.18 | Fails — CTA text must switch to charcoal |
| White text on Sage | 2.97 | Fails — CTA text must switch to charcoal |
| Gold icon on white | 2.47 | Fine only because the icon is decorative |

The landing-page CTA must keep using the automatic black/white text helper, because marketers can
enter any accent color.
