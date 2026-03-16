import { createContext, useContext, useState } from 'react'
import { translations } from './i18n'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'en')
  const t = translations[lang]

  function setLang(l) {
    localStorage.setItem('lang', l)
    setLangState(l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
