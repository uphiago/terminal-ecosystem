import './App.css'
import { LanguageProvider } from './LanguageContext'
import LanguageSwitcher from './components/LanguageSwitcher'
import Hero from './components/Hero'
import LayerDiagram from './components/LayerDiagram'
import EcosystemGraph from './components/EcosystemGraph'
import CommandFlow from './components/CommandFlow'
import Footer from './components/Footer'

export default function App() {
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
    </LanguageProvider>
  )
}
