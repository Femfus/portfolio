import { useState, useEffect } from 'react'
import SocialIcons from './SocialIcons'
import TimeTracker from './TimeTracker'
import { playClick } from '../utils/sound'
import { navItems, bottomNavItems } from '../data/sections'

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return mobile
}

export default function SideContainer({ activeSection, setActiveSection }) {
  const isMobile = useIsMobile()

  const desktopStyle = {
    position: 'fixed',
    top: '4vh',
    left: '12px',
    zIndex: 10,
    height: '92vh',
    width: '34%',
    minWidth: '320px',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    padding: '48px 40px',
    background: 'linear-gradient(180deg, rgba(8,4,16,0.85) 0%, rgba(12,6,18,0.82) 50%, rgba(16,8,16,0.80) 100%)',
    backdropFilter: 'blur(52px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(52px) saturate(1.2)',
    border: '1px solid rgba(200,120,170,0.08)',
    borderRadius: '24px',
    boxShadow: '0 0 80px rgba(0,0,0,0.6), 30px 0 80px rgba(0,0,0,0.4), 10px 0 30px rgba(0,0,0,0.3)',
    overflowY: 'auto',
    transformStyle: 'preserve-3d',
    transformOrigin: 'left center',
    transform: 'perspective(800px) rotateY(7deg)',
    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  const mobileStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 24px)',
    maxWidth: '400px',
    zIndex: 10,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '32px 28px',
    background: 'linear-gradient(180deg, rgba(8,4,16,0.9) 0%, rgba(12,6,18,0.88) 50%, rgba(16,8,16,0.85) 100%)',
    backdropFilter: 'blur(52px) saturate(1.2)',
    WebkitBackdropFilter: 'blur(52px) saturate(1.2)',
    border: '1px solid rgba(200,120,170,0.08)',
    borderRadius: '20px',
    boxShadow: '0 -10px 60px rgba(0,0,0,0.5)',
    overflowY: 'auto',
    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  return (
    <aside
      id="side-container"
      style={isMobile ? mobileStyle : desktopStyle}
    >
      {/* ── Name ──────────────────────────────────────────── */}
      <h1
        className="animate-fade-slide-up"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          animationDelay: '0.2s',
        }}
      >
        Molly
      </h1>

      {/* ── Description ───────────────────────────────────── */}
      <p
        className="animate-fade-slide-up"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          fontWeight: 300,
          color: 'var(--text-secondary)',
          marginTop: '10px',
          animationDelay: '0.3s',
        }}
      >
        Based in the Faroes
      </p>

      {/* ── Main area — always show nav ─────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '32px' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {navItems.map((label, i) => (
            <NavButton
              key={label}
              label={label}
              delay={i * 0.08 + 0.3}
              active={activeSection === label}
              onClick={() => setActiveSection(activeSection === label ? null : label)}
            />
          ))}

          <div style={{ height: '16px' }} />

          {bottomNavItems.map((label, i) => (
            <NavButton
              key={label}
              label={label}
              delay={(navItems.length + i) * 0.08 + 0.3}
              active={activeSection === label}
              onClick={() => setActiveSection(activeSection === label ? null : label)}
            />
          ))}
        </nav>
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '40px' }}>
        <SocialIcons />
        <TimeTracker />
        <p
          className="animate-fade-in"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            animationDelay: '0.8s',
          }}
        >
          © 2026 Molly
        </p>
      </div>
    </aside>
  )
}

/* ── Nav button component ──────────────────────────────────── */
function NavButton({ label, delay, onClick, active }) {
  const handleClick = () => { playClick(); onClick() }
  return (
    <button
      id={`nav-${label.toLowerCase()}`}
      onClick={handleClick}
      className="animate-fade-slide-up"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'none',
        border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
        fontWeight: active ? 500 : 400,
        color: active ? 'var(--text-primary)' : 'rgba(255,255,255,0.5)',
        padding: active ? '20px 4px 20px 8px' : '20px 4px',
        width: '100%',
        textAlign: 'left',
        letterSpacing: '0.01em',
        transition: 'all 0.3s ease',
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--text-primary)'
        e.currentTarget.style.paddingLeft = '8px'
        e.currentTarget.querySelector('.arrow').style.opacity = '1'
        e.currentTarget.querySelector('.arrow').style.transform = 'translateX(0)'
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
          e.currentTarget.style.paddingLeft = '4px'
          e.currentTarget.querySelector('.arrow').style.opacity = '0'
          e.currentTarget.querySelector('.arrow').style.transform = 'translateX(-8px)'
        }
      }}
    >
      {label}
      <span
        className="arrow"
        style={{
          fontSize: '1.1em',
          opacity: active ? 1 : 0,
          transform: active ? 'translateX(0)' : 'translateX(-8px)',
          transition: 'all 0.3s ease',
          color: 'var(--accent)',
        }}
      >
        →
      </span>
    </button>
  )
}
