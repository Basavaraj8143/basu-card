#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import gradient from "gradient-string";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  HEADER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const nameGrad = gradient(["#00f5a0", "#00d9f5"])("Basavaraj Ningasani");
const role = chalk.hex("#a0a0b0")("CSE Student  ·  Aspiring Software Engineer  ·  Full-Stack Developer");

const divider = chalk.hex("#1e3a2e")("─".repeat(52));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LINKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const gh    = chalk.hex("#58a6ff")("⌥ GitHub   ") + chalk.white("github.com/Basavaraj8143");
const li    = chalk.hex("#0e76a8")("⌥ LinkedIn ") + chalk.white("linkedin.com/in/basavaraj-ningasani-0796712a5");
const mail  = chalk.hex("#ea4335")("⌥ Email    ") + chalk.white("basavarajningasani123@gmail.com");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TECH STACK  (grouped)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const label   = (t) => chalk.hex("#00f5a0").bold(t);
const tag     = (t) => chalk.hex("#1aff8c").bgHex("#0a1f15")(` ${t} `);

const frontend = label("Frontend  ") + [tag("React"), tag("Next.js"),tag("html")].join(" ");
const backend  = label("Backend   ") + [tag("Node.js"), tag("Python"),tag("java")].join(" ");
const database = label("Database  ") + [tag("MySQL"), tag("MongoDB"),tag("PostgreSQL")].join(" ");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PROJECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const proj = (icon, name, desc) =>
  ` ${chalk.hex("#00f5a0")(icon)} ${chalk.white.bold(name)} ${chalk.hex("#555566")("·")} ${chalk.hex("#888899")(desc)}`;

const projects = [
  proj("◈", "Studium",           "Electron-based PDF Browser"),
  proj("◈", "AgriSense",         "AI Smart Farming Platform"),
  proj("◈", "Audio2Notes AI",    "Lecture Audio → Structured Notes"),
  proj("◈", "Distributed Storage system", "Fault-tolerant Storage System"),
].join("\n");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FOOTER TAGLINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const tagline = gradient(["#00f5a0", "#00d9f5"])(
  "⚡ Building real-world systems · Open source · Backend-first"
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  COMPOSE CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const sectionTitle = (t) =>
  chalk.hex("#00f5a0").bold(`  ◆ ${t.toUpperCase()}`);

const card = `
  ${nameGrad}
  ${role}

${divider}
${sectionTitle("Connect")}

  ${gh}
  ${li}
  ${mail}

${divider}
${sectionTitle("Tech Stack")}

  ${frontend}
  ${backend}
  ${database}

${divider}
${sectionTitle("Projects")}

${projects}

${divider}

  ${tagline}
`;

console.log(
  boxen(card, {
    padding: { top: 1, bottom: 1, left: 2, right: 2 },
    margin: 1,
    borderStyle: "double",
    borderColor: "#00f5a0",
  })
);