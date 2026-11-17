# CLAUDE.md — Plot Twist

Read SPEC.md before starting any task. It describes what we are building.

## Design source of truth
- The Figma design is the source of truth. It is exported as PNGs in `design/`
  (Final Design, Design System). Match it closely: layout, spacing, colors, fonts and text.
- Exact colors, fonts and sizes are in `design/tokens.md`. Use those values; never invent new colors.
- Ignore `design/process/`. It holds early wireframes, not the final design.
- Don't call the Figma MCP unless I ask. Use the local files.
- If something in the design would hurt accessibility, tell me before changing it.

## Stack
- React + TypeScript + Vite
- Tailwind CSS (theme values defined once from design/tokens.md)
- React Router for pages
- Vitest for unit tests, Playwright for end-to-end tests
- Data in localStorage behind src/lib/storage.ts
- Fonts: Libre Baskerville and Inter from Google Fonts (link tag in index.html)

## How to work
- I am on a Claude Pro plan with limited usage. Be efficient: keep replies short, avoid
  re-reading files you already read, and don't repeat code back to me.
- Build one screen at a time, in the order I ask.
- Before writing code for a new screen, give a short plan (5 bullets max) in simple English
  and wait for my approval.
- After each change, summarize what you changed and why in 3 short bullets max.
- Only run the tests related to what you just changed, not the whole suite every time.
- I am on Windows using PowerShell. Give PowerShell commands, not macOS/Linux commands.
- When writing files from PowerShell, never add a BOM.
- Do not install a new library without telling me what it is and why we need it.
- After a screen works, suggest a short git commit message.

## Code style
- Small, reusable components in `src/components/`.
- Pages in `src/pages/`.
- Logic (variant generation, demo data, stats, contrast) in `src/lib/`, separate from UI so it
  can be unit tested.
- Use clear names. Add short comments only where the logic is not obvious.
- TypeScript strict mode. No `any`.
- Icons: simple line icons as inline SVG components. No emojis as icons.

## Design rules
- Demo brand: "Bookish Bunny" (made-up). Never use any real company's name, logo, or branding.
- Mobile-friendly on every screen (375px wide, no horizontal scroll, 44px tap targets).
- Accessible: semantic HTML, keyboard navigation, visible focus, AA color contrast.
- Simulated data and AI features must be labeled honestly (e.g. "Sample", "Demo Analysis").
