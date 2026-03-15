import { useState, useEffect, useRef } from 'react'
import { useLang } from '../LanguageContext'
import { layerTranslations } from '../i18n'
import './LayerDiagram.css'

const LAYER_DURATION = 3800

const TOOL_LINKS = {
  'Alacritty':        'https://github.com/alacritty/alacritty',
  'Kitty':            'https://github.com/kovidgoyal/kitty',
  'WezTerm':          'https://github.com/wez/wezterm',
  'Windows Terminal': 'https://github.com/microsoft/terminal',
  'iTerm2':           'https://github.com/gnachman/iTerm2',
  'tmux':             'https://github.com/tmux/tmux',
  'zellij':           'https://github.com/zellij-org/zellij',
  'bash':             'https://www.gnu.org/software/bash/',
  'zsh':              'https://www.zsh.org/',
  'fish':             'https://github.com/fish-shell/fish-shell',
  'powershell':       'https://github.com/PowerShell/PowerShell',
  'Oh My Zsh':        'https://github.com/ohmyzsh/ohmyzsh',
  'Prezto':           'https://github.com/sorin-ionescu/prezto',
  'Starship':         'https://github.com/starship/starship',
  'Powerlevel10k':    'https://github.com/romkatv/powerlevel10k',
  'git':              'https://github.com/git/git',
  'docker':           'https://github.com/docker/docker-ce',
  'kubectl':          'https://github.com/kubernetes/kubectl',
  'grep':             'https://www.gnu.org/software/grep/',
  'vim':              'https://github.com/vim/vim',
  'terraform':        'https://github.com/hashicorp/terraform',
  'node':             'https://github.com/nodejs/node',
  'Linux':            'https://github.com/torvalds/linux',
  'macOS':            'https://developer.apple.com/macos/',
  'Windows':          'https://www.microsoft.com/windows',
}

// Static non-translatable data per layer id
const LAYER_STATIC = {
  user:       { color: '#e6edf3', accent: 'rgba(230,237,243,0.15)', icon: '⌨',  tools: ['Teclado', 'Monitor'] },
  emulator:   { color: '#58a6ff', accent: 'rgba(88,166,255,0.15)',  icon: '▣',  tools: ['Alacritty', 'Kitty', 'WezTerm', 'Windows Terminal', 'iTerm2'] },
  multiplexer:{ color: '#bc8cff', accent: 'rgba(188,140,255,0.15)', icon: '⊞',  tools: ['tmux', 'zellij'], optional: true },
  shell:      { color: '#3fb950', accent: 'rgba(63,185,80,0.15)',   icon: '$',   tools: ['bash', 'zsh', 'fish', 'powershell'] },
  framework:  { color: '#ff9442', accent: 'rgba(255,148,66,0.15)',  icon: '⚙',  tools: ['Oh My Zsh', 'Prezto', 'Starship', 'Powerlevel10k'], optional: true },
  cli:        { color: '#39d353', accent: 'rgba(57,211,83,0.15)',   icon: '>_', tools: ['git', 'docker', 'kubectl', 'grep', 'vim', 'terraform', 'node'] },
  kernel:     { color: '#f85149', accent: 'rgba(248,81,73,0.15)',   icon: '◎',  tools: ['Linux', 'macOS', 'Windows'] },
}

function ToolChip({ name, large }) {
  const url = TOOL_LINKS[name]
  const cls = large ? 'tool-chip-lg mono' : 'tool-chip mono'
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} chip-link`}
        onClick={e => e.stopPropagation()}
      >
        {name}
        <span className="chip-arrow">↗</span>
      </a>
    )
  }
  return <span className={cls}>{name}</span>
}

export default function LayerDiagram() {
  const { lang, t } = useLang()
  const lt = t.layers

  // Merge static data with translated strings
  const LAYERS = layerTranslations[lang].map(tr => ({
    ...LAYER_STATIC[tr.id],
    ...tr,
  }))

  const total = LAYERS.length
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef(null)

  function startLoop(fromIdx) {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % total)
    }, LAYER_DURATION)
  }

  useEffect(() => {
    startLoop(0)
    return () => clearInterval(timerRef.current)
  }, [total])

  function handleClick(i) {
    clearInterval(timerRef.current)
    setActiveIdx(i)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % total)
    }, LAYER_DURATION)
  }

  const activeLayer = LAYERS[activeIdx]

  return (
    <section id="layers">
      <div className="section-label">{lt.label}</div>
      <h2 className="section-title">
        {lt.title} <span>{lt.titleSpan}</span> {lt.titleEnd}
      </h2>
      <p className="section-desc">
        {lt.desc}
      </p>

      <div className="layer-layout">
        <div className="layer-stack">
          {LAYERS.map((layer, i) => (
            <div key={layer.id} className="layer-row">
              <button
                className={`layer-block glass-card ${activeIdx === i ? 'active' : ''}`}
                style={{ '--accent': layer.accent, '--color': layer.color }}
                onClick={() => handleClick(i)}
              >
                <div className="layer-left">
                  <span className="layer-icon mono" style={{ color: layer.color }}>{layer.icon}</span>
                  <div className="layer-info">
                    <div className="layer-name">
                      {layer.label}
                      {layer.optional && <span className="layer-optional">{lt.optional}</span>}
                    </div>
                    <div className="layer-desc">{layer.desc}</div>
                  </div>
                </div>
                <div className="layer-tools">
                  {layer.tools.slice(0, 3).map(t => (
                    <ToolChip key={t} name={t} />
                  ))}
                  {layer.tools.length > 3 && (
                    <span className="tool-chip mono muted">+{layer.tools.length - 3}</span>
                  )}
                </div>
              </button>

              {i < LAYERS.length - 1 && (
                <div className="layer-connector">
                  <div className="connector-line" />
                  <div className="connector-arrow">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="layer-detail">
          <div key={activeLayer.id} className="detail-inner" style={{ '--color': activeLayer.color }}>
            {/* header */}
            <div className="detail-header">
              <div className="detail-header-left">
                <span className="detail-icon">{activeLayer.icon}</span>
                <div>
                  <div className="detail-label">{activeLayer.label}</div>
                  {activeLayer.responsibility && (
                    <div className="detail-responsibility mono">{activeLayer.responsibility}</div>
                  )}
                </div>
              </div>
              {activeLayer.optional && (
                <span className="detail-optional-badge mono">{lt.optional}</span>
              )}
            </div>

            {/* description */}
            <p className="detail-text">{activeLayer.details}</p>

            {/* misconception */}
            {activeLayer.misconception && (
              <div className="detail-misconception">
                <span className="detail-misconception-icon">⚠</span>
                <p>{activeLayer.misconception}</p>
              </div>
            )}

            {/* facts */}
            {activeLayer.facts?.length > 0 && (
              <div className="detail-facts">
                <div className="detail-section-label mono">{lt.factsLabel}</div>
                <ul className="detail-facts-list">
                  {activeLayer.facts.map((f, i) => (
                    <li key={i} className="detail-fact-item">{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* tool cards */}
            {activeLayer.toolDetails?.length > 0 && (
              <div className="detail-tool-cards">
                <div className="detail-section-label mono">{lt.toolsLabel}</div>
                <div className="detail-tool-list">
                  {activeLayer.toolDetails.map(td => {
                    const url = TOOL_LINKS[td.name]
                    return (
                      <div key={td.name} className="detail-tool-row">
                        <div className="detail-tool-name">
                          {url
                            ? <a href={url} target="_blank" rel="noopener noreferrer" className="detail-tool-link">{td.name} <span>↗</span></a>
                            : <span>{td.name}</span>
                          }
                        </div>
                        <div className="detail-tool-desc">{td.desc}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
