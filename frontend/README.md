# 📘 GateCrash Frontend

This directory contains the **GateCrash** UI – the client‑side application for minting, managing, and selling NFT‑based tickets, contracts, and other non‑duplicable documents on Sui.

---

## 🚀 Quick Start

### 1. Prerequisites

| Tool    | Minimum Version   | Install / Check                |
| ------- | ----------------- | ------------------------------ |
| Node.js | 16 +              | `node -v`                      |
| Yarn    | 1 + (or Corepack) | `yarn -v` or `corepack enable` |
| Git     | —                 | `git --version`                |

> **WSL / Linux note**
> If you’re on Windows Subsystem for Linux (WSL), run all commands inside your WSL shell.

---

### 2. Clone & Install

```bash
git clone https://github.com/<your‑org>/GateCrash.git
cd GateCrash/frontend/GateCrash      # ★ ensure you’re in this sub‑folder
yarn install                         # installs dependencies
```

---

### 3. Run Locally

```bash
yarn dev
```

* Default URL: [**http://localhost:5173**](http://localhost:5173)

Stop the server with **Ctrl + C**.
Restart any time with `yarn dev` (from the same folder).

---

## 🗂 Folder Structure

```
frontend/
└─ GateCrash/
   ├─ public/          # static assets
   ├─ src/             # React / TS source code
   ├─ index.html       # Vite entry
   ├─ package.json     # scripts & deps
   └─ ...other files
```

---

## 🛠 Scripts

| Script         | Action                              |
| -------------- | ----------------------------------- |
| `yarn install` | Install / update dependencies       |
| `yarn dev`     | Launch Vite dev server (hot‑reload) |
| `yarn build`   | Production build (dist/)            |
| `yarn preview` | Preview prod build locally          |

---

## 🧹 Accidentally installed in the wrong folder?

If you ran `yarn install` outside **frontend/GateCrash/**:

```bash
rm -rf node_modules yarn.lock .yarn-integrity
```

Then navigate into the correct folder and reinstall.

---

## 🙋‍♂️ Need Help?

1. Double‑check you’re inside **frontend/GateCrash** before running any Yarn commands.
2. Verify Node ≥ 16 and Yarn are installed (`node -v`, `yarn -v`).
3. Still stuck? Open an issue or ping the team on Slack/Discord.

---

Happy building! 🚀
