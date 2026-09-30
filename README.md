# Daniel McCormick

**Applied AI, Research & Business Systems**

A responsive one-page portfolio exploring how research, thoughtful workflows, and practical digital tools can make complex work easier to use.

**Live website:** [daniel-mccormick-portfolio.vercel.app](https://daniel-mccormick-portfolio.vercel.app/)

## Selected work

- MyKidsLunch Delivery
- Terrapin Stucco Estimator
- AppealWise
- Evidence Atlas & Interview Desk
- Connected Calendar
- ReelDrop

Project overviews distinguish work, development directions, and concepts. Interface illustrations use fictional data and are not screenshots of the underlying applications.

## Run locally

Open `public/index.html` in a modern browser, or use Node.js 22 or later:

```sh
npm run dev
```

Then open `http://127.0.0.1:3000`. There are no package dependencies to install.

For a hosted development sandbox that needs an externally reachable preview:

```sh
npm run dev -- --host 0.0.0.0 --port 3000
```

## Project structure

```text
public/
  index.html       Page content and project illustrations
  styles.css       Layout, colors, typography, and responsive styles
  script.js        Project summaries, dialogs, and mobile navigation
  assets/mark.svg  Favicon
scripts/serve.mjs  Optional local preview server
vercel.json       Static deployment configuration
```

The website uses semantic HTML, CSS, and JavaScript. Features include six project dialogs, mobile navigation, a skip link, visible keyboard focus, reduced-motion support, and print styles. No analytics, external fonts, API keys, database, or backend is required.

## Deploy with Vercel

Import this repository as a new project. The included `vercel.json` selects the **Other** framework preset, skips installation and building, and serves only `public/`.

The live Vercel project is connected to this repository's `main` branch. Updates pushed to `main` can deploy automatically. The published HTML, CSS, JavaScript, and favicon were verified against the reviewed release on September 30, 2026.

## Continue in v0

Use **Import from GitHub** and select this repository. If prompted, choose the repository root. Use the development command above for the preview. Preserve the static layout, existing content, fictional illustration labels, and keyboard interactions when making changes.

The repository contains the portfolio website only. It does not contain the featured applications' private code or operational records.

GitHub profile: [Dazzy5467](https://github.com/Dazzy5467).
