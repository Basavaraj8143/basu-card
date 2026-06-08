#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import gradient from "gradient-string";
import { select } from "@inquirer/prompts";
import open from "open";
import { portfolioData } from "./portfolio.js";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CLEAR CONSOLE HELPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function clearConsole() {
  process.stdout.write("\u001b[2J\u001b[H\u001b[3J");
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STATIC CARD GENERATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function generateStaticCard() {
  const { profile, skills, projects } = portfolioData;

  const nameGrad = gradient(["#00f5a0", "#00d9f5"])(profile.name);
  const role = chalk.hex("#a0a0b0")(profile.role);
  const divider = chalk.hex("#1e3a2e")("─".repeat(68));

  const gh = chalk.hex("#58a6ff")("⌥ GitHub   ") + chalk.white(profile.social.github.replace("https://", ""));
  const li = chalk.hex("#0e76a8")("⌥ LinkedIn ") + chalk.white(profile.social.linkedin.replace("https://", ""));
  const mail = chalk.hex("#ea4335")("⌥ Email    ") + chalk.white(profile.email);

  const label = (t) => chalk.hex("#00f5a0").bold(t.padEnd(10));
  const tag = (t) => chalk.hex("#1aff8c").bgHex("#0a1f15")(` ${t} `);

  const frontend = label("Frontend") + skills.frontend.map(tag).join(" ");
  const backend  = label("Backend") + skills.backend.map(tag).join(" ");
  const database = label("Database") + skills.database.map(tag).join(" ");

  const projFormat = (icon, name, desc) =>
    ` ${chalk.hex("#00f5a0")(icon)} ${chalk.white.bold(name)} ${chalk.hex("#555566")("·")} ${chalk.hex("#888899")(desc)}`;

  // Show top 4 projects in the static card for compactness
  const projLines = projects.slice(0, 4).map(p => 
    projFormat("◈", p.title, p.description.length > 30 ? p.description.slice(0, 30) + "..." : p.description)
  ).join("\n");

  const tagline = gradient(["#00f5a0", "#00d9f5"])(
    "⚡ Building real-world systems · Open source · Backend-first"
  );

  const sectionTitle = (t) => chalk.hex("#00f5a0").bold(`  ◆ ${t.toUpperCase()}`);

  const card = `  ${nameGrad}
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
${projLines}
${divider}
  ${tagline}`;

  return boxen(card, {
    padding: { top: 1, bottom: 1, left: 2, right: 2 },
    margin: 1,
    borderStyle: "double",
    borderColor: "#00f5a0",
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SUB-MENUS HANDLERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function handleProjects() {
  while (true) {
    clearConsole();
    console.log(gradient(["#00f5a0", "#00d9f5"])("\n  📂 PROJECTS"));
    console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

    const choices = portfolioData.projects.map((p, index) => ({
      name: `${index + 1}. ${chalk.white.bold(p.title)} - ${chalk.hex("#a0a0b0")(p.tags.join(", "))}`,
      value: p
    }));
    choices.push({ name: chalk.yellow("⟨ Back to Main Menu"), value: "back" });

    const selected = await select({
      message: "Select a project to view details or open its GitHub repository:",
      choices
    });

    if (selected === "back") {
      break;
    }

    while (true) {
      clearConsole();
      console.log(gradient(["#00f5a0", "#00d9f5"])(`\n  ◈ ${selected.title.toUpperCase()}`));
      console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

      console.log(`  ${chalk.hex("#00f5a0").bold("Description:")}`);
      console.log(`  ${chalk.white(selected.description)}\n`);

      console.log(`  ${chalk.hex("#00f5a0").bold("Technologies:")}`);
      console.log(`  ${selected.tags.map(t => chalk.hex("#1aff8c").bgHex("#0a1f15")(` ${t} `)).join(" ")}\n`);

      console.log(`  ${chalk.hex("#00f5a0").bold("GitHub Repo:")}`);
      console.log(`  ${chalk.underline.hex("#58a6ff")(selected.github)}\n`);

      const action = await select({
        message: "What would you like to do?",
        choices: [
          { name: "🌐 Open GitHub Link in Browser", value: "open" },
          { name: "⟨ Back to Projects List", value: "back" }
        ]
      });

      if (action === "open") {
        try {
          await open(selected.github);
        } catch {
          console.log(chalk.red("\n  Failed to open link automatically."));
          await new Promise(r => setTimeout(r, 1500));
        }
      } else {
        break;
      }
    }
  }
}

async function handleOpenSource() {
  while (true) {
    clearConsole();
    console.log(gradient(["#00f5a0", "#00d9f5"])("\n  🚀 OPEN SOURCE CONTRIBUTIONS"));
    console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

    const choices = portfolioData.openSource.map((os, index) => ({
      name: `${index + 1}. [${chalk.hex("#00d9f5")(os.status)}] ${chalk.white.bold(os.repo)}: ${os.title}`,
      value: os
    }));
    choices.push({ name: chalk.yellow("⟨ Back to Main Menu"), value: "back" });

    const selected = await select({
      message: "Select a contribution to view / open link:",
      choices
    });

    if (selected === "back") {
      break;
    }

    while (true) {
      clearConsole();
      console.log(gradient(["#00f5a0", "#00d9f5"])(`\n  🚀 ${selected.repo}`));
      console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

      console.log(`  ${chalk.hex("#00f5a0").bold("Contribution:")} ${chalk.white(selected.title)}`);
      console.log(`  ${chalk.hex("#00f5a0").bold("Status:")}       ${chalk.white(selected.status)}`);
      console.log(`  ${chalk.hex("#00f5a0").bold("Link:")}         ${chalk.underline.hex("#58a6ff")(selected.link)}\n`);

      const action = await select({
        message: "What would you like to do?",
        choices: [
          { name: "🌐 Open PR/Repo in Browser", value: "open" },
          { name: "⟨ Back to Open Source List", value: "back" }
        ]
      });

      if (action === "open") {
        try {
          await open(selected.link);
        } catch {
          console.log(chalk.red("\n  Failed to open link automatically."));
          await new Promise(r => setTimeout(r, 1500));
        }
      } else {
        break;
      }
    }
  }
}

async function handleHackathons() {
  while (true) {
    clearConsole();
    console.log(gradient(["#00f5a0", "#00d9f5"])("\n  🏆 HACKATHONS & ACHIEVEMENTS"));
    console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

    const choices = portfolioData.hackathons.map((h, index) => ({
      name: `${index + 1}. ${chalk.white.bold(h.title)} - ${chalk.hex("#00d9f5")(h.badge)} (${h.role})`,
      value: h
    }));
    choices.push({ name: chalk.yellow("⟨ Back to Main Menu"), value: "back" });

    const selected = await select({
      message: "Select a hackathon to view details:",
      choices
    });

    if (selected === "back") {
      break;
    }

    while (true) {
      clearConsole();
      console.log(gradient(["#00f5a0", "#00d9f5"])(`\n  🏆 ${selected.title}`));
      console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

      console.log(`  ${chalk.hex("#00f5a0").bold("Role:")}   ${chalk.white(selected.role)}`);
      console.log(`  ${chalk.hex("#00f5a0").bold("Result:")} ${chalk.white(selected.badge)}`);
      if (selected.link) {
        console.log(`  ${chalk.hex("#00f5a0").bold("Link:")}   ${chalk.underline.hex("#58a6ff")(selected.link)}\n`);
      } else {
        console.log(`  ${chalk.hex("#00f5a0").bold("Link:")}   ${chalk.gray("No public link available")}\n`);
      }

      const subChoices = [];
      if (selected.link) {
        subChoices.push({ name: "🌐 Open Project/Hackathon Link", value: "open" });
      }
      subChoices.push({ name: "⟨ Back to Hackathons List", value: "back" });

      const action = await select({
        message: "What would you like to do?",
        choices: subChoices
      });

      if (action === "open") {
        try {
          await open(selected.link);
        } catch {
          console.log(chalk.red("\n  Failed to open link automatically."));
          await new Promise(r => setTimeout(r, 1500));
        }
      } else {
        break;
      }
    }
  }
}

async function handleCertificates() {
  while (true) {
    clearConsole();
    console.log(gradient(["#00f5a0", "#00d9f5"])("\n  📜 CERTIFICATIONS"));
    console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

    const choices = portfolioData.certificates.map((c, index) => ({
      name: `${index + 1}. ${chalk.white.bold(c.title)} - ${chalk.hex("#a0a0b0")(c.issuer)}`,
      value: c
    }));
    choices.push({ name: chalk.yellow("⟨ Back to Main Menu"), value: "back" });

    const selected = await select({
      message: "Select a certificate to view details or verify:",
      choices
    });

    if (selected === "back") {
      break;
    }

    while (true) {
      clearConsole();
      console.log(gradient(["#00f5a0", "#00d9f5"])(`\n  📜 ${selected.title}`));
      console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

      console.log(`  ${chalk.hex("#00f5a0").bold("Issuer:")} ${chalk.white(selected.issuer)}`);
      console.log(`  ${chalk.hex("#00f5a0").bold("Type:")}   ${chalk.white(selected.badge)}`);
      console.log(`  ${chalk.hex("#00f5a0").bold("Link:")}   ${chalk.underline.hex("#58a6ff")(selected.link)}\n`);

      const action = await select({
        message: "What would you like to do?",
        choices: [
          { name: "🌐 Open Certificate Verification Link", value: "verify" },
          { name: "⟨ Back to Certificates List", value: "back" }
        ]
      });

      if (action === "verify") {
        try {
          await open(selected.link);
        } catch {
          console.log(chalk.red("\n  Failed to open link automatically."));
          await new Promise(r => setTimeout(r, 1500));
        }
      } else {
        break;
      }
    }
  }
}

async function handleConnect() {
  while (true) {
    clearConsole();
    console.log(gradient(["#00f5a0", "#00d9f5"])("\n  🌐 CONNECT & SOCIALS"));
    console.log(chalk.hex("#1e3a2e")("  " + "─".repeat(50) + "\n"));

    const { social, email } = portfolioData.profile;

    const action = await select({
      message: "Select an option to open in your browser or client:",
      choices: [
        { name: `⌥ GitHub (${social.github})`, value: { type: "browser", url: social.github } },
        { name: `⌥ LinkedIn (${social.linkedin})`, value: { type: "browser", url: social.linkedin } },
        { name: `⌥ Email (${email})`, value: { type: "email", url: `mailto:${email}` } },
        { name: chalk.yellow("⟨ Back to Main Menu"), value: "back" }
      ]
    });

    if (action === "back") {
      break;
    }

    try {
      await open(action.url);
    } catch {
      console.log(chalk.red("\n  Failed to open link automatically."));
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

async function handleSubMenu(action) {
  if (action === "projects") {
    await handleProjects();
  } else if (action === "opensource") {
    await handleOpenSource();
  } else if (action === "hackathons") {
    await handleHackathons();
  } else if (action === "certificates") {
    await handleCertificates();
  } else if (action === "connect") {
    await handleConnect();
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MAIN LOOP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function mainLoop() {
  clearConsole();
  console.log(generateStaticCard());

  while (true) {
    const action = await select({
      message: chalk.cyan.bold("Choose an option:"),
      choices: [
        { name: "📂 View Detailed Projects", value: "projects" },
        { name: "🚀 View Open Source Contributions", value: "opensource" },
        { name: "🏆 View Hackathons & Achievements", value: "hackathons" },
        { name: "📜 View Certificates", value: "certificates" },
        { name: "🌐 Open Profile Links (Browser)", value: "connect" },
        { name: "🚪 Exit", value: "exit" }
      ]
    });

    if (action === "exit") {
      clearConsole();
      console.log(gradient(["#00f5a0", "#00d9f5"])("\n  Thanks for visiting! Have a wonderful day! 🚀\n"));
      break;
    }

    await handleSubMenu(action);

    // After returning from a submenu, clear terminal and reprint the card once
    clearConsole();
    console.log(generateStaticCard());
  }
}

mainLoop().catch(err => {
  if (err.name === 'ExitPromptError' || err.message?.includes('force closed') || err.message?.includes('Ctrl+C')) {
    console.log(chalk.yellow("\n  Goodbye! 👋\n"));
    process.exit(0);
  } else {
    console.error("\nAn error occurred:", err);
    process.exit(1);
  }
});