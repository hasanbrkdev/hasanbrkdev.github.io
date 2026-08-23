# hasanbrkdev.github.io

Personal portfolio + résumé builder for Hasan Burak Özdemir. Night-editorial design with cozy 3D artwork (Nano Banana Pro), animated project diagrams, and a print-ready PDF résumé generated in the browser.

## Stack

Vite · React 18 · TypeScript · Tailwind CSS 3 · framer-motion · lucide-react · @react-pdf/renderer

## Architecture — the tailoring contract

**`src/content/profile.ts` is the single source of truth.** Every section of the site AND the PDF résumé render from it. A tailoring workflow (Claude skill) customises the portfolio per job application by editing only this file:

1. Edit `src/content/profile.ts` (validated by `src/content/schema.ts` — run `npm test`)
2. Commit as `content: tailor for <company>`
3. Push → GitHub Actions rebuilds and deploys Pages

Rollback: `git revert <commit>` or `git checkout content-baseline -- src/content/profile.ts`. The `content-baseline` tag marks the canonical version.

Layout copy that never changes per-application lives in `src/content/copy.ts`. Artwork paths live in `src/content/assets.ts`.

## Commands

```bash
npm run dev       # dev server
npm test          # vitest (content schema + resume model)
npm run e2e       # playwright smoke tests (builds nothing; runs against preview)
npm run build     # type-check + production build
npm run preview   # serve dist locally
```

## Notes

- Résumé PDF embeds Noto Sans (built-in Helvetica cannot encode Turkish 'İ').
- 4K artwork originals live in `art-originals/` (gitignored); web-optimised copies in `public/assets/`.
- Project process diagrams are animated SVGs (`src/components/diagrams/ProjectDiagram.tsx`) following the diagram-design skill's motion principles: complete static frame, staggered reveal, one decorative flow token, reduced-motion safe.
