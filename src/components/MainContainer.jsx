import { sections } from '../data/sections'

/**
 * Main content panel — displays the active section content
 * in a matching glass panel on the right side of the sidebar.
 * Demo use only.
 */
export default function MainContainer({ activeSection }) {
  if (!activeSection) return null

  return (
    <main
      id="main-container"
      className="animate-fade-slide-up"
      style={{
        position: 'fixed',
        top: '8vh',
        left: '25%',
        zIndex: 9,
        height: '84vh',
        width: 'calc(66% - 60px)',
        minWidth: '400px',
        maxWidth: '720px',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 44px',
        background: 'linear-gradient(180deg, rgba(8,4,16,0.78) 0%, rgba(12,6,18,0.75) 50%, rgba(16,8,16,0.72) 100%)',
        backdropFilter: 'blur(48px) saturate(1.15)',
        WebkitBackdropFilter: 'blur(48px) saturate(1.15)',
        border: '1px solid rgba(200,120,170,0.06)',
        borderRadius: '24px',
        boxShadow: '0 0 60px rgba(0,0,0,0.4), 15px 0 50px rgba(0,0,0,0.25)',
        overflowY: 'auto',
        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        animationDelay: '0.05s',
      }}
    >
      {/* Section title */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}
      >
        {activeSection}
      </h2>

      {/* Accent underline */}
      <div style={{
        width: '40px',
        height: '2px',
        background: 'linear-gradient(90deg, var(--accent), transparent)',
        marginBottom: '32px',
      }} />

      {/* Content */}
      <div style={{ flex: 1 }}>
        {sections[activeSection]}
      </div>
    </main>
  )
}
