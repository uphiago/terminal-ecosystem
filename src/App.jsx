import { useEffect } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { LanguageProvider } from './LanguageContext'
import LanguageSwitcher from './components/LanguageSwitcher'
import Hero from './components/Hero'
import LayerDiagram from './components/LayerDiagram'
import EcosystemGraph from './components/EcosystemGraph'
import CommandFlow from './components/CommandFlow'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    sections.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <LanguageProvider>
      <div className="app">
        <LanguageSwitcher />
        <Hero />
        <LayerDiagram />
        <CommandFlow />
        <EcosystemGraph />
        <Footer />
      </div>
      <Analytics />
    </LanguageProvider>
  )
}
