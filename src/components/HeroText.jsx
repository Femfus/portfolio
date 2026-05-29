export default function HeroText() {
  return (
    <section id="hero-text" className="flex flex-col" style={{ gap: '28px' }}>
      {/* Name */}
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

      {/* Bio paragraph */}
      <p
        className="animate-fade-slide-up"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.45)',
          animationDelay: '0.4s',
        }}
      >
        I'm a developer who writes code and cares about the{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>little details</span>,
        whether that's in code, design, or the people I'm around.
        When I'm not building things, you'll probably find me{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>taking photos</span>{' '}
        on walks or whatever catches my eye.
      </p>

      {/* Divider */}
      <div
        className="animate-fade-slide-up"
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(200,120,170,0.2), transparent)',
          animationDelay: '0.5s',
        }}
      />

      {/* Tech stack */}
      <p
        className="animate-fade-slide-up"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
          fontWeight: 300,
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.4)',
          animationDelay: '0.55s',
        }}
      >
        I build with{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>TypeScript</span> and{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Python</span>, with{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>React</span>,{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Next.js</span>, and{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Tailwind</span> on
        the frontend, shipped with{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Docker</span> and{' '}
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Kubernetes</span>.
      </p>
    </section>
  )
}
