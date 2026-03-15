import { useLang } from '../LanguageContext'
import './Hero.css'

const HERO_TOOLS = [
  { name: 'Alacritty', color: '#58a6ff', url: 'https://github.com/alacritty/alacritty' },
  { name: 'tmux',      color: '#bc8cff', url: 'https://github.com/tmux/tmux' },
  { name: 'zsh',       color: '#3fb950', url: 'https://www.zsh.org/' },
  { name: 'Oh My Zsh', color: '#ff9442', url: 'https://github.com/ohmyzsh/ohmyzsh' },
  { name: 'git',       color: '#f85149', url: 'https://github.com/git/git' },
]

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <div className="hero">
      <div className="hero-bg">
        <div className="hero-glow glow-1" />
        <div className="hero-glow glow-2" />
        <div className="hero-glow glow-3" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          {h.title1}<br />
          {h.title2} <span className="hero-highlight">{h.highlight}</span><br />
          {h.title3}
        </h1>

        <p className="hero-sub">
          {h.sub}
        </p>

        <div className="hero-stack">
          {HERO_TOOLS.map((tool, i) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-stack-item"
              style={{ animationDelay: `${i * 0.08}s`, '--tool-color': tool.color }}
            >
              <span className="hero-stack-dot" />
              <span className="mono">{tool.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="hero-fade" />
      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </div>
  )
}
