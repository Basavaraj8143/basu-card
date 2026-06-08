<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0f23,50:1a1a3e,100:0d1117&height=180&section=header&text=basavarajmn&fontSize=52&fontColor=00d4aa&fontAlignY=42&desc=Interactive%20CLI%20Business%20Card&descAlignY=68&descSize=18&descColor=8b8fa8&animation=fadeIn" width="100%" />

<br/>

<a href="https://npmjs.com/package/basavarajmn">
  <img src="https://img.shields.io/npm/v/basavarajmn?style=for-the-badge&labelColor=0d1117&color=00d4aa&logo=npm&logoColor=white" alt="npm version" />
</a>
<a href="https://npmjs.com/package/basavarajmn">
  <img src="https://img.shields.io/npm/dt/basavarajmn?style=for-the-badge&labelColor=0d1117&color=7c3aed&logo=npm&logoColor=white" alt="downloads" />
</a>
<a href="https://github.com/Basavaraj8143/basu-card/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/Basavaraj8143/basu-card?style=for-the-badge&labelColor=0d1117&color=f59e0b&logoColor=white" alt="license" />
</a>
<a href="https://nodejs.org">
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=for-the-badge&labelColor=0d1117&color=22c55e&logo=nodedotjs&logoColor=white" alt="node version" />
</a>

<br/><br/>

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   $ npx basavarajmn                                      ║
║                                                          ║
║   ▸ Projects      ▸ Open Source   ▸ Hackathons           ║
║   ▸ Certifications                ▸ Contact              ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```

**A terminal portfolio you can run from anywhere — no install needed.**

</div>

---

## ⚡ Quick Start

```bash
npx basavarajmn
```

> No installation required. Just run and explore.

---

## 🎬 Demo

<div align="center">

<!-- Replace with your actual GIF/screenshot -->
<img src="./assets/demo.gif" alt="CLI card demo" width="680" />

*Arrow-key navigation · Live browser links · Smooth sub-menus*

</div>

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🎛️ | **Interactive Menu** | Arrow-key navigation powered by `@inquirer/prompts` |
| 📦 | **Compact Layout** | Fits any terminal — no wrapping, no glitches |
| 🗂️ | **Sub-menu Browsers** | Drill into projects, OSS, hackathons & certs |
| 🔗 | **Smart Link Opening** | Launches GitHub, LinkedIn, email & repos in your browser |
| 🧹 | **Clean Console** | Clears both viewport *and* scrollback on every navigation |
| 🛑 | **Graceful Exit** | `Ctrl+C` exits cleanly — no stack traces |

---

## 💻 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Basavaraj8143/basu-card.git
cd basu-card

# 2. Install dependencies
npm install

# 3. Run locally
node index.js
```

### Customize Your Card

All profile data, projects, and links live in one place:

```
basu-card/
├── index.js          ← Entry point & menu logic
├── portfolio.js      ← ✏️  Edit your data here
└── package.json
```

Open [`portfolio.js`](./portfolio.js) and update your name, bio, projects, socials, and anything else you want to show off.

---

## 🛠️ Tech Stack

<div align="center">

| Package | Purpose |
|---|---|
| [`boxen`](https://github.com/sindresorhus/boxen) | Terminal box borders & layout |
| [`chalk`](https://github.com/chalk/chalk) | ANSI color styling |
| [`gradient-string`](https://github.com/sindresorhus/gradient-string) | Color gradient text |
| [`@inquirer/prompts`](https://github.com/SBoudrias/Inquirer.js) | Interactive prompt selectors |
| [`open`](https://github.com/sindresorhus/open) | Cross-platform link launcher |

</div>

---

## 📦 Publishing Your Own

Fork this repo, update `portfolio.js` with your info, then publish to npm:

```bash
# Update name in package.json first
npm login
npm publish
```

Now anyone can run `npx <your-name>` to see your card. 🎉

---

## 🤝 Contributing

Issues and PRs are welcome! If you find a bug or have a feature idea, [open an issue](https://github.com/Basavaraj8143/basu-card/issues).

---

<div align="center">

Built with ☕ by **[Basavaraj Ningasani](https://github.com/Basavaraj8143)**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:1a1a3e,100:0f0f23&height=100&section=footer&animation=fadeIn" width="100%" />

</div>