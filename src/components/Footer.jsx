import { useLang } from '../LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="footer-brand mono">{f.brand}</span>
        <span className="footer-tagline">{f.tagline}</span>
      </div>

      <nav className="footer-nav">
        <button className="footer-nav-link" onClick={() => scrollTo('layers')}>{f.navLayers}</button>
        <button className="footer-nav-link" onClick={() => scrollTo('flow')}>{f.navFlow}</button>
        <button className="footer-nav-link" onClick={() => scrollTo('graph')}>{f.navGraph}</button>
      </nav>

      <div className="footer-right">
        <a
          href="https://cloud.umami.is/analytics/us/share/ZeYEV3VCguX4ldQW"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-stats"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          {f.stats}
        </a>
        <a
          href="https://x.com/uphiago"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-x"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          @uphiago
        </a>
        <a
          href="https://github.com/uphiago/shellcraft"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-github"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          {f.github}
        </a>
        <span className="footer-year">2026</span>
      </div>
    </footer>
  )
}
