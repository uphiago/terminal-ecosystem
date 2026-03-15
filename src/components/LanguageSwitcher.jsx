import { useState, useEffect, useRef } from 'react'
import { useLang } from '../LanguageContext'
import './LanguageSwitcher.css'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [scrolling, setScrolling] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolling(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setScrolling(false), 900)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const next = lang === 'pt-BR' ? 'en' : 'pt-BR'
  const label = lang === 'pt-BR' ? 'EN' : 'PT'

  return (
    <button
      className={`lang-switcher${scrolling ? ' scrolling' : ''}`}
      onClick={() => setLang(next)}
      title={lang === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
      aria-label="Switch language"
    >
      {label}
    </button>
  )
}
