import { useState, useEffect } from 'react'

// Project start time — set to when we started building (May 29, 2026 17:02 BST)
const PROJECT_START = new Date('2026-05-29T16:02:00Z').getTime()

export default function TimeTracker() {
  const [elapsed, setElapsed] = useState(getElapsed())

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        animationDelay: '0.9s',
      }}
    >
      <span style={{
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#5c8',
        boxShadow: '0 0 6px rgba(85,204,136,0.5)',
        animation: 'pulse 2s ease-in-out infinite',
      }} />
      {elapsed}
    </div>
  )
}

function getElapsed() {
  const diff = Date.now() - PROJECT_START
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const h = hours
  const m = minutes % 60
  const s = seconds % 60

  const pad = (n) => String(n).padStart(2, '0')

  if (h > 0) {
    return `${h}h ${pad(m)}m built`
  }
  return `${m}m ${pad(s)}s built`
}
