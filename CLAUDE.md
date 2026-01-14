# Project Context
This is a small MVP web app: a "Swipe-to-Trade (mini)" marketplace. Users post listings with HAVE and WANT. MVP focuses on CRUD + discovery + match proposals. Prioritize correctness, simplicity, and fast iteration.

## Workflow (MANDATORY)
- Follow Explore → Plan → Code.
- Before editing files, briefly summarize what you’re changing and why.
- Keep changes minimal. Do not add abstractions or extra files unless requested.
- If unclear, ask a single clarifying question BEFORE making major changes.

## Code Style
- TypeScript strict, avoid `any`
- Prefer named exports
- Keep components small and readable
- Tailwind for styling (no custom CSS files unless requested)

## Commands
- `npm run dev` - start dev server
- `npm run lint` - lint
- `npm run test` - tests (optional later)
- `npx prisma migrate dev` - DB migrations
- `npx prisma studio` - DB viewer (optional)

## MVP Guardrails (IMPORTANT)
- No authentication in v1.
- No payments in v1.
- No chat in v1 (store "proposals" only).
- Keep UI simple: 3 pages max for MVP.

## Safety / Hallucination Reduction
- Do not edit unrelated files.
- If you need a package, explain why, then install it.
- If a file’s purpose is unclear, read it first.

## Context & Sessions
- One Claude session per task/feature.
- If context gets messy, use /compact then /clear and reload key files.
- Use SCRATCHPAD.md to persist decisions and progress.
