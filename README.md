# terminal ecosystem

> A visual, interactive reference for the full terminal stack — built as a companion to the YouTube channel.

**[shellcraft.vercel.app](https://shellcraft.vercel.app)** · [YouTube](https://youtube.com/@uphiago) · [X @uphiago](https://x.com/uphiago)

---

## What it covers

### 1 — Layers diagram
Interactive breakdown of every layer between you and the kernel. Click any row to expand details, facts, misconceptions, and tool links.

```
⌨  User
▣  Terminal Emulator   →  renders text, manages PTY master
⊞  Multiplexer         →  sessions, splits, detach/attach  (optional)
$  Shell               →  parses commands, fork()+execve()
⚙  Shell Framework     →  plugins, themes, prompt          (optional)
>_ CLI Programs         →  git, docker, ripgrep, …
◎  Kernel / OS         →  syscalls, VFS, process management
```

### 2 — Execution flow
Animated, step-by-step walkthrough of `git status` — from the physical keypress through PTY, shell, fork, kernel syscalls, filesystem, and back to the screen. Auto-plays when scrolled into view, pauses when you leave.

### 3 — Ecosystem map
Interactive node graph of 20+ tools and their connections. Locked by default (so it doesn't hijack page scroll); click **unlock** to drag, zoom and explore. Every node links to its GitHub repo.

### i18n
Full **PT-BR / EN** support. Toggle in the top-right corner.

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
| Font | [Geist](https://vercel.com/font) — Geist, GeistMono, GeistPixel |
| Styling | Zero UI framework — custom CSS, glassmorphism |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) + [Umami](https://umami.is) (self-hostable, privacy-first) |
| Deploy | [Vercel](https://vercel.com) — auto-deploy on push to `main` |

---

## Run locally

```bash
git clone https://github.com/uphiago/shellcraft
cd shellcraft
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & preview

```bash
npm run build    # outputs to dist/
npm run preview  # serves the built output locally
```

## Deploy

The project is deployed on **Vercel**. Every push to `main` triggers an automatic deployment.

To deploy your own fork:

```bash
npm i -g vercel
vercel
```

Or connect the repo directly in the [Vercel dashboard](https://vercel.com/new) — zero config needed for Vite projects.

---

## Analytics

- **Vercel Analytics** — Web Vitals and visit data, built into the deployment.
- **Umami** — privacy-first, cookie-free analytics. Public stats dashboard: [cloud.umami.is/share/…](https://cloud.umami.is/analytics/us/share/ZeYEV3VCguX4ldQW)

---

## License

MIT
