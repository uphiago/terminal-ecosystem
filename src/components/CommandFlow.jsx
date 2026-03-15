import { useState, useEffect, useRef, useCallback } from 'react'
import { useLang } from '../LanguageContext'
import { stepTranslations } from '../i18n'
import './CommandFlow.css'

// Static non-translatable data per step id
const STEP_STATIC = {
  keyboard:   { icon: '⌨',  color: '#e6edf3', direction: 'down',  payload: 'g i t   s t a t u s ⏎' },
  emulator:   { icon: '▣',  color: '#58a6ff', direction: 'down',  payload: '"git status\\n"' },
  shell:      { icon: '$_', color: '#3fb950', direction: 'down',  payload: 'argv = ["git", "status"]' },
  fork:       { icon: '⑂',  color: '#bc8cff', direction: 'down',  payload: 'pid = fork()\nexecve("/usr/bin/git", …)' },
  kernel:     { icon: '◎',  color: '#ff9442', direction: 'down',  payload: 'open(".git/HEAD")\nread() → stat()' },
  filesystem: { icon: '▤',  color: '#39d353', direction: 'up',    payload: '.git/HEAD\n.git/index\n.git/refs/…' },
  output:     { icon: '▶',  color: '#58a6ff', direction: 'up',    payload: 'On branch main\nnothing to commit' },
}

const STEP_DURATION = 5200

export default function CommandFlow() {
  const { lang, t } = useLang()
  const ft = t.flow
  const [active, setActive] = useState(0)
  const [pulse, setPulse] = useState(false)
  const [started, setStarted] = useState(false)
  const timerRef = useRef(null)
  const sectionRef = useRef(null)

  // Merge static data with translated strings
  const STEPS = stepTranslations[lang].map(tr => ({
    ...STEP_STATIC[tr.id],
    ...tr,
  }))

  const total = STEPS.length

  const goTo = useCallback((i) => {
    setActive(i)
    setPulse(true)
    setTimeout(() => setPulse(false), 500)
  }, [])

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % total
        setPulse(true)
        setTimeout(() => setPulse(false), 500)
        return next
      })
    }, STEP_DURATION)
  }

  // Start only when section enters viewport; pause when it leaves
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          startTimer()
        } else {
          clearInterval(timerRef.current)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => { observer.disconnect(); clearInterval(timerRef.current) }
  }, [total])

  function handleDotClick(i) {
    goTo(i)
    startTimer()
  }

  const current = STEPS[active]

  return (
    <section id="flow" className="flow-section" ref={sectionRef}>
      <div className="section-label">{ft.label}</div>
      <h2 className="section-title">
        {ft.title} <span>git status</span>
      </h2>
      <p className="section-desc">
        {ft.desc}
      </p>

      <div className="flow-root">
        {/* Pipeline vertical */}
        <div className="flow-pipeline">
          <div className="flow-prompt glass-card">
            <span className="flow-prompt-ps mono">~/projects</span>
            <span className="flow-prompt-sym mono">&nbsp;$&nbsp;</span>
            <span className="flow-prompt-cmd mono">git status</span>
            <span className="flow-prompt-cursor" />
          </div>

          {/* connector from prompt to first node */}
          <div className="flow-prompt-pipe">
            <div className="flow-prompt-pipe-line" />
          </div>

          <div className="flow-nodes">
            {STEPS.map((step, i) => {
              const isActive = started && i === active
              const isDone = started && i < active
              const isReturn = step.direction === 'up'

              return (
                <div key={step.id} className="flow-node-wrapper">
                  {i > 0 && (
                    <div
                      className={`flow-pipe ${isDone || isActive ? 'lit' : ''} ${isReturn ? 'return' : ''}`}
                      style={{ '--c': STEPS[i - 1].color }}
                    >
                      <div
                        className={`flow-pipe-fill ${isDone || isActive ? 'animate' : ''}`}
                        style={{ '--c': step.color }}
                      />
                      {isActive && (
                        <div className="flow-payload-bubble" style={{ '--c': step.color }}>
                          <span className="mono">{STEPS[i - 1].payload?.split('\n')[0]}</span>
                        </div>
                      )}
                      {isReturn && <div className="return-label mono">↑ return</div>}
                    </div>
                  )}

                  <button
                    className={`flow-node-card glass-card ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                    style={{ '--c': step.color }}
                    onClick={() => handleDotClick(i)}
                    title={step.label}
                  >
                    <div className="fnc-left">
                      <div className={`fnc-icon mono ${isActive && pulse ? 'pulse' : ''}`}>{step.icon}</div>
                      <div className="fnc-text">
                        <div className="fnc-label">{step.label}</div>
                        <div className="fnc-sub mono">{step.sublabel}</div>
                      </div>
                    </div>
                    <div className="fnc-right">
                      {(isDone || isActive) && (
                        <div className="fnc-payload mono" style={{ color: step.color }}>
                          {step.payloadLabel}
                        </div>
                      )}
                      <div className={`fnc-status ${isActive ? 'active' : isDone ? 'done' : ''}`} />
                    </div>
                  </button>

                  {/* Mobile inline detail — shown only on small screens when active */}
                  {isActive && (
                    <div className="flow-inline-detail" style={{ '--c': step.color }}>
                      <p className="fid-desc">{step.desc}</p>
                      <div className="fid-payload glass-card">
                        <div className="fid-payload-label mono">{step.payloadLabel}</div>
                        <pre className="fid-payload-value mono">{step.payload}</pre>
                      </div>
                      <div className="fid-meta">
                        {step.detail.map(d => (
                          <div key={d.label} className="fid-meta-row">
                            <span className="fid-meta-key mono">{d.label}</span>
                            <span className="fid-meta-val mono">{d.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flow-detail">
          <div className="flow-detail-inner">
            <div className="fd-header">
              <div className="fd-step mono" style={{ color: current.color }}>
                {ft.step} {active + 1} / {total}
              </div>
              <div className="fd-icon mono" style={{ color: current.color }}>{current.icon}</div>
              <div className="fd-title">{current.label}</div>
              <div className="fd-sub mono">{current.sublabel}</div>
            </div>

            <p className="fd-desc">{current.desc}</p>

            <div className="fd-payload glass-card">
              <div className="fd-payload-label mono">{current.payloadLabel}</div>
              <pre className="fd-payload-value mono">{current.payload}</pre>
            </div>

            <div className="fd-meta">
              {current.detail.map(d => (
                <div key={d.label} className="fd-meta-row">
                  <span className="fd-meta-key mono">{d.label}</span>
                  <span className="fd-meta-val mono">{d.value}</span>
                </div>
              ))}
            </div>

            {/* Só os dots — clicáveis */}
            <div className="fd-progress">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  className={`fd-progress-dot ${started && i === active ? 'active' : ''} ${started && i < active ? 'done' : ''}`}
                  style={{ '--c': s.color }}
                  onClick={() => handleDotClick(i)}
                  title={s.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
