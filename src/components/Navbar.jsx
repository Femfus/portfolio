import { useState } from 'react'

const navItems = [
  { label: 'Home',    href: '#home',    icon: '◈' },
  { label: 'Work',    href: '#work',    icon: '◇' },
  { label: 'About',   href: '#about',   icon: '○' },
  { label: 'Contact', href: '#contact', icon: '△' },
]

export default function Navbar() {
  const [active, setActive] = useState('Home')

  return (
    <nav id="main-nav" className="flex flex-col gap-2">
      {/* Logo / brand mark */}
      <div
        className="animate-fade-slide-up mb-6 flex items-center gap-3"
        style={{ animationDelay: '0.05s' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: 'linear-gradient(135deg, rgba(200,120,170,0.3), rgba(140,80,200,0.2))',
            border: '1px solid rgba(200,120,170,0.2)',
            fontFamily: 'var(--font-display)',
            color: 'var(--accent-bright)',
          }}
        >
          M
        </div>
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-muted)',
          }}
        >
          Portfolio
        </span>
      </div>

      {/* Nav links */}
      {navItems.map((item, i) => {
        const isActive = active === item.label
        return (
          <a
            key={item.label}
            id={`nav-${item.label.toLowerCase()}`}
            href={item.href}
            onClick={() => setActive(item.label)}
            className="animate-fade-slide-up group relative flex items-center gap-3.5 rounded-xl transition-all duration-300 ease-out"
            style={{
              fontFamily: 'var(--font-body)',
              animationDelay: `${(i + 1) * 0.08 + 0.1}s`,
              padding: '10px 16px',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? 'var(--accent-bright)' : 'rgba(255,255,255,0.35)',
              background: isActive
                ? 'linear-gradient(135deg, rgba(200,120,170,0.12), rgba(140,80,200,0.06))'
                : 'transparent',
              border: isActive
                ? '1px solid rgba(200,120,170,0.15)'
                : '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.border = '1px solid transparent'
              }
            }}
          >
            {/* Geometric icon */}
            <span
              className="transition-all duration-300"
              style={{
                fontSize: '10px',
                opacity: isActive ? 1 : 0.4,
                color: isActive ? 'var(--accent)' : 'inherit',
                transform: isActive ? 'scale(1.2)' : 'scale(1)',
                display: 'inline-block',
              }}
            >
              {item.icon}
            </span>

            {item.label}

            {/* Active glow line on left */}
            {isActive && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full"
                style={{
                  height: '60%',
                  background: 'linear-gradient(180deg, transparent, var(--accent), transparent)',
                }}
              />
            )}
          </a>
        )
      })}
    </nav>
  )
}
