# CLAUDE.md — Plot Twist

Read SPEC.md before starting any task. It describes what we are building.

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- React Router for pagess
- Vitest for unit tests, Playwright for end-to-end tests
- Round 1: localStorage. Round 2+: Supabase.

## How to work
- I am on a Claude Pro plan with limited usage. Be efficient: keep replies short, avoid
  re-reading files you already read, and don't repeat code back to me.
- Build one feature at a time, in the round order from SPEC.md.
- Before writing code for a new feature, give a short plan (5 bullets max) in simple English
  and wait for my approval.
- After each change, summarize what you changed and why in 3 short bullets max.
- Only run the tests related to what you just changed, not the whole suite every time.
- I am on Windows using PowerShell. Give PowerShell commands, not macOS/Linux commands.
- Do not install a new library without telling me what it is and why we need it.
- After a feature works, suggest a short git commit message.

## Code style
- Small, reusable components in `src/components/`.
- Pages in `src/pages/`.
- Logic (like combination generation and stats) in `src/lib/`, kept separate from UI so it
  can be unit tested.
- Use clear names. Add short comments only where the logic is not obvious.
- TypeScript strict mode. No `any`.

## Design
- Clean, friendly, book-themed look for the made-up brand "Chapter Box".
- Mobile-friendly on every screen.
- Accessible: semantic HTML, keyboard navigation, visible focus, good color contrast (WCAG AA).
- Never use any real company's name, logo, or branding.
