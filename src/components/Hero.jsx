import { useLang } from '../LanguageContext'
import './Hero.css'

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
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {h.badge}
        </div>

        <h1 className="hero-title">
          {h.title1}<br />
          {h.title2} <span className="hero-highlight">{h.highlight}</span><br />
          {h.title3}
        </h1>

        <p className="hero-sub">
          {h.sub}
        </p>

        <div className="hero-stack">
          {['Alacritty', 'tmux', 'zsh', 'Oh My Zsh', 'git'].map((tool, i) => (
            <div key={tool} className="hero-stack-item" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="mono">{tool}</span>
            </div>
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
