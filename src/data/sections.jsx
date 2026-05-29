/* ── Shared section content for sidebar and main container ──── */

export const sections = {
  About: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
        fontWeight: 300,
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.5)',
      }}>
        Heyo, I'm <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Molly</span> (aka{' '}
        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>femfus</span>). I'm an{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>18-year-old</span> based in the{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Faroe Islands</span>.
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
        fontWeight: 300,
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.5)',
      }}>
        I'm a <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>front-end developer</span> with
        a keen eye for <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>UI/UX</span>, and I
        enjoy working in teams.
      </p>
      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, rgba(200,120,170,0.2), transparent)',
        margin: '4px 0',
      }} />
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
        fontWeight: 300,
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.4)',
      }}>
        I work mostly with{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>React</span>,{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>TypeScript</span>, and other{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>web frameworks</span>.
      </p>
    </div>
  ),
  Projects: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {[
        { name: 'Project Alpha', desc: 'A real-time collaboration platform built with WebSockets and React.' },
        { name: 'Nebula UI', desc: 'An open-source component library with dark-first design principles.' },
        { name: 'Pixelwalk', desc: 'A photography portfolio generator with automatic color grading.' },
      ].map((project) => (
        <div key={project.name} style={{
          padding: '16px 20px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(200,120,170,0.08)',
          transition: 'all 0.3s ease',
          cursor: 'default',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(200,120,170,0.06)'
            e.currentTarget.style.borderColor = 'rgba(200,120,170,0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            e.currentTarget.style.borderColor = 'rgba(200,120,170,0.08)'
          }}
        >
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}>{project.name}</h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.4)',
          }}>{project.desc}</p>
        </div>
      ))}
    </div>
  ),
  Contact: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
        fontWeight: 300,
        lineHeight: 1.8,
        color: 'rgba(255,255,255,0.5)',
      }}>
        Want to work together or just say hi? Feel free to reach out.
      </p>
      <a
        href="mailto:hello@example.com"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          fontWeight: 500,
          color: 'var(--accent)',
          textDecoration: 'none',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-bright)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent)'}
      >
        hello@example.com →
      </a>
    </div>
  ),
}

export const navItems = ['About', 'Projects']
export const bottomNavItems = ['Contact']
