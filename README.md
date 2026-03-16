# shellcraft

[![MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/react-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/github/deployments/uphiago/shellcraft/production?label=vercel&logo=vercel&logoColor=white)](https://shellcraft.vercel.app)

Maps every layer between your keyboard and the kernel: interactive diagrams, animated execution flow, and tool links. PT-BR / EN.

**Live:** [shellcraft.vercel.app](https://shellcraft.vercel.app)

---

## What's inside

**Layers diagram:** click any row to expand details, facts, misconceptions, and tool links for that layer.

```
⌨  User
▣  Terminal Emulator   →  renders text, manages PTY master
⊞  Multiplexer         →  sessions, splits, detach/attach  (optional)
$  Shell               →  parses commands, fork()+execve()
⚙  Shell Framework     →  plugins, themes, prompt          (optional)
>_ CLI Programs         →  git, docker, ripgrep, …
◎  Kernel / OS         →  syscalls, VFS, process management
```

**Execution flow:** animated walkthrough of `git status`, from keypress → PTY → shell → fork → syscalls → filesystem → screen. Starts only when scrolled into view.

**Ecosystem map:** interactive node graph of 20+ tools. Locked by default (won't hijack scroll); click unlock to drag and zoom.

---

## Tools covered

| Layer | Tools |
|---|---|
| Terminal Emulator | [Alacritty](https://github.com/alacritty/alacritty) · [Kitty](https://github.com/kovidgoyal/kitty) · [WezTerm](https://github.com/wez/wezterm) · [Windows Terminal](https://github.com/microsoft/terminal) · [iTerm2](https://github.com/gnachman/iTerm2) |
| Multiplexer | [tmux](https://github.com/tmux/tmux) · [zellij](https://github.com/zellij-org/zellij) |
| Shell | [bash](https://www.gnu.org/software/bash/) · [zsh](https://www.zsh.org/) · [fish](https://github.com/fish-shell/fish-shell) · [PowerShell](https://github.com/PowerShell/PowerShell) |
| Framework / Prompt | [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) · [Prezto](https://github.com/sorin-ionescu/prezto) · [Starship](https://github.com/starship/starship) · [Powerlevel10k](https://github.com/romkatv/powerlevel10k) |
| CLI | [git](https://github.com/git/git) · [docker](https://github.com/docker/docker-ce) · [kubectl](https://github.com/kubernetes/kubectl) · [vim](https://github.com/vim/vim) · [ripgrep](https://github.com/BurntSushi/ripgrep) · [terraform](https://github.com/hashicorp/terraform) · [node](https://github.com/nodejs/node) |
| Kernel / OS | [Linux](https://github.com/torvalds/linux) · [macOS](https://developer.apple.com/macos/) · [Windows (WSL2 / ConPTY)](https://www.microsoft.com/windows) |

---

## Stack

| | |
|---|---|
| Framework | [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) |
| Graph | [React Flow (@xyflow/react)](https://reactflow.dev/) |
| Font | [Geist](https://vercel.com/font): Geist, GeistMono, GeistPixel |
| Styling | Zero UI framework, custom CSS, glassmorphism |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) + [Umami](https://umami.is) (self-hosted, privacy-first, no cookies) |
| Deploy | [Vercel](https://vercel.com), auto-deploy on push to `main` |

---

## Run locally

```bash
git clone https://github.com/uphiago/shellcraft
cd shellcraft
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # outputs to dist/
npm run preview  # serves the built output locally
```

## Deploy your own

Connect the repo in the [Vercel dashboard](https://vercel.com/new), zero config needed for Vite. Or via CLI:

```bash
npm i -g vercel && vercel
```

---

## Analytics

- **Vercel Analytics:** Web Vitals and traffic, built into the deployment.
- **Umami:** cookie-free, open-source. Public dashboard: [cloud.umami.is/share/…](https://cloud.umami.is/analytics/us/share/ZeYEV3VCguX4ldQW)

---

MIT
