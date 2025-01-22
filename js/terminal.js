document.addEventListener("DOMContentLoaded", () => {
    const terminals = document.querySelectorAll(".terminal-window");
    const terminalStates = new Map();
  
    const terminalCommands = {
      "password-generator": [
        { command: "cd ~/projects", delay: 500 },
        { command: "ls -la", delay: 1000 },
        { command: "cat PasswordGenerator.md", delay: 1500 },
      ],
      duckyscript: [
        { command: "cd ~/projects", delay: 500 },
        { command: "ls -la", delay: 1000 },
        { command: "cat DuckyScript.md", delay: 1500 },
      ],
    };
  
    const typeWithMistakes = async (element, text, speed = 50) => {
      element.textContent = "";
      const mistakes = {
        cd: "cd..",
        ls: "sl",
        cat: "cta",
      };
  
      for (let i = 0; i < text.length; i++) {
        if (Math.random() < 0.1) {
          const word = Object.keys(mistakes).find((word) =>
            text.substr(i).startsWith(word)
          );
          if (word) {
            const typo = mistakes[word];
            for (let j = 0; j < typo.length; j++) {
              element.textContent += typo[j];
              await new Promise((r) => setTimeout(r, speed));
            }
            await new Promise((r) => setTimeout(r, 300));
            for (let j = 0; j < typo.length; j++) {
              element.textContent = element.textContent.slice(0, -1);
              await new Promise((r) => setTimeout(r, speed / 2));
            }
            for (let j = 0; j < word.length; j++) {
              element.textContent += word[j];
              await new Promise((r) => setTimeout(r, speed));
            }
            i += word.length - 1;
            continue;
          }
        }
        element.textContent += text[i];
        await new Promise((r) => setTimeout(r, speed));
      }
    };
  
    const executeCommands = async (terminal, commands) => {
      const commandElement = terminal.querySelector(".command.typing");
      const details = terminal.querySelector(".project-details");
      const terminalContent = terminal.querySelector(".terminal-content");
      const state = terminalStates.get(terminal);
  
      terminalContent.classList.add("processing");
  
      try {
        for (const cmd of commands) {
          await new Promise((r) => setTimeout(r, cmd.delay));
          await typeWithMistakes(commandElement, cmd.command);
          state.history.push(cmd.command);
        }
  
        if (terminal.dataset.name === "duckyscript") {
          const output = terminal.querySelector(".command-output");
          output.textContent = `# 🦆 DuckyScript Converter
  
  A web tool for converting text to DuckyScript format.
  
  ## 🚀 Features
  * ⚡️ Real-time conversion
  * 📋 One-click copy
  * 🎨 Clean interface
  * 💻 Multi-platform
  * 🔧 Command validation
  
  ## Tech Stack
  * HTML5
  * CSS3
  * JavaScript
  
  ## Demo
  https://modded-soldier-9.github.io/text2ducky/`;
        }
  
        requestAnimationFrame(() => {
          details.classList.remove("hidden");
          details.classList.add("visible");
        });
      } finally {
        terminalContent.classList.remove("processing");
      }
    };
  
    terminals.forEach((terminal, index) => {
      const name = index === 0 ? "password-generator" : "duckyscript";
      terminal.dataset.name = name;
  
      terminalStates.set(terminal, {
        history: [],
        currentHistoryIndex: -1,
      });
  
      terminal.setAttribute("tabindex", "0");
      terminal.setAttribute("role", "region");
      terminal.setAttribute("aria-label", `${name} terminal window`);
  
      const copyButton = terminal.querySelector(".copy-button");
      if (copyButton) {
        copyButton.addEventListener("click", async () => {
          const output = terminal.querySelector(".command-output");
          try {
            await navigator.clipboard.writeText(output.textContent);
            copyButton.innerHTML =
              '<i class="fas fa-check"></i><span>Copied!</span>';
            setTimeout(() => {
              copyButton.innerHTML =
                '<i class="fas fa-copy"></i><span>Copy</span>';
            }, 1500);
          } catch (err) {
            console.error("Copy failed:", err);
          }
        });
      }
    });
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const terminal = entry.target;
            terminal.classList.add("visible");
            executeCommands(terminal, terminalCommands[terminal.dataset.name]);
            observer.unobserve(terminal);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    terminals.forEach((terminal) => observer.observe(terminal));
  });
  