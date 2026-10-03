# Running InfectoAtlas GT on Replit

This project uses React, Vite and a minimal Node server for PubMed.

- Use Node.js 22.12+ (the Node.js 22 module is configured).
- Install with `npx --yes pnpm@11.19.0 install --frozen-lockfile --ignore-scripts`.
- The Run button starts `node server/index.mjs --dev` on port 5000, serving Vite and the API together.
- Build with `npx --yes pnpm@11.19.0 run build`; serve production with `node server/index.mjs`.
- Run tests with `npx --yes pnpm@11.19.0 test`.
- No deployment or paid service has been activated. See README.md for integration instructions and optional server-only NCBI settings.

The current academic document analyzer is rule-based and does not require a Gemini API key to run.
