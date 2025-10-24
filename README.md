# AuroraHire Poster Studio

AuroraHire Poster Studio is a Next.js web experience for generating event-ready poster concepts for AI-first job portals. Use the configurator to remix role copy, gradients, and layouts, then export a high-resolution PNG the moment you are happy with the composition.

## ✨ Highlights

- Interactive poster builder with three art-directed layouts tuned for AI hiring campaigns.
- Gradient palette switcher crafted for neon, aurora, and techno-futuristic moods.
- Live copy editor for role headlines, impact pillars, compensation, and CTA ribbons.
- One-click export powered by `html-to-image` for social drops, print boards, or slides.

## 🧱 Project Structure

```
/
├── README.md              # This guide
└── web/                   # Next.js app (App Router + Tailwind CSS)
    ├── public/
    ├── src/
    │   └── app/
    │       ├── layout.tsx
    │       └── page.tsx   # Poster builder + gallery
    ├── package.json
    └── ...
```

## 🚀 Getting Started

```bash
cd web
npm install
npm run dev
```

Visit `http://localhost:3000` to iterate on poster content, tweak palettes, and preview responsive layouts.

## 🏗️ Production Build

```bash
cd web
npm run build
npm run start
```

The project ships as a static-optimized Next.js site ready for Vercel deployments.

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS via `@tailwindcss/postcss`
- `html-to-image` for client-side exports
- `lucide-react` icon system

## 📄 License

The source is provided as-is for internal or commercial use. Customize and extend for your AI recruitment activations.
