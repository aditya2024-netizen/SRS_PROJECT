# SRS_PROJECT

This repository contains two React frontends deployed together for GitHub Pages:

- Vite app: `vite-app/` (build in `vite-app/dist/`) — served at: `https://aditya2024-netizen.github.io/SRS_PROJECT/vite-app/`
- CRA app: `cra-app/` (build in `cra-app/build/`) — served at: `https://aditya2024-netizen.github.io/SRS_PROJECT/cra-app/`

Builds were produced locally and committed so GitHub Pages can serve the static sites from the `main` branch root.

---

How to reproduce locally:

- Vite app:
  - cd `vite-app`
  - npm install
  - npm run build
- CRA app:
  - cd `cra-app`
  - npm install
  - npm run build

Note: Do not commit `node_modules/` — `.gitignore` excludes that folder.
