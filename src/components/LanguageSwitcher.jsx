import { useLang } from '../LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()

  const next = lang === 'pt-BR' ? 'en' : 'pt-BR'
  const flag = lang === 'pt-BR' ? '🇺🇸' : '🇧🇷'

  return (
    <button
      className="lang-switcher"
      onClick={() => setLang(next)}
      title={lang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
      aria-label="Switch language"
    >
      {flag}
    </button>
  )
}
