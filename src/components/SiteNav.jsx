import { useState, useEffect, useRef } from 'react'
import './SiteNav.css'

const SITES = [
  { id: 'shellcraft',  label: 'shellcraft',  desc: 'terminal ecosystem', url: 'https://shellcraft.vercel.app/' },
  { id: 'distronomad', label: 'distronomad', desc: 'linux distro guide',  url: 'https://distronomad.vercel.app/' },
]

export default function SiteNav({ current }) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeTimer = useRef(null)
  const menuRef = useRef(null)

  function openMenu()  { setOpen(true); setClosing(false) }
  function closeMenu() {
    setClosing(true)
    closeTimer.current = setTimeout(() => { setOpen(false); setClosing(false) }, 180)
  }
  function toggle() { open ? closeMenu() : openMenu() }

  // close on outside click
  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
  }, [open])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <div className="sitenav" ref={menuRef}>
      <button
        className={`sitenav-toggle${open ? ' open' : ''}`}
        onClick={toggle}
        aria-label="site navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className={`sitenav-menu${closing ? ' closing' : ''}`}>
          {SITES.map(site => (
            <a
              key={site.id}
              href={site.url}
              className={`sitenav-item${site.id === current ? ' current' : ''}`}
            >
              <div className="sitenav-item-row">
                <span className="sitenav-item-name">{site.label}</span>
                {site.id === current && <span className="sitenav-badge mono">here</span>}
              </div>
              <span className="sitenav-item-desc mono">{site.desc}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
