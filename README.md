# Akash Kishan Karri — Portfolio (React + Vite)

Plain React (Vite + TypeScript + React Router + Tailwind CSS). No Next.js.

## Pages
- `/` — Home (hero + quick nav)
- `/work` — All projects (each with a photo stack), skills, education
- `/experience` — Internships, leadership, achievements, certifications
- `/contact` — Contact details

## Run locally
```
npm install
npm run dev
```

## Build
```
npm run build
```
Outputs static files to `dist/` — deployable to Vercel, Netlify, GitHub Pages, or any static host.

## Editing content
All resume content lives in `src/lib/data.ts`. Edit that file to update
projects, skills, experience, education, achievements, or contact info.

## Photo stacks — IMPORTANT
Each project in `src/lib/data.ts` has a `photos: string[]` array currently
pointing at placeholder images (picsum.photos, seeded so they're stable).
To use your real screenshots:

1. Drop 2-3 images per project into `public/projects/<project-slug>/`
   (e.g. `public/projects/mdc-website/1.png`).
2. Update the matching `photos` array in `src/lib/data.ts` to `/projects/<slug>/1.png` etc.

The `PhotoStack` component (`src/components/PhotoStack.tsx`) fans the images
out on hover — works with any image URLs or local paths, no other changes needed.
