import { useState, useEffect, useCallback } from 'react'
import catGif from '../assets/cat.gif'

/**
 * A little cat that drifts across the sky area (right side of the screen)
 * every now and then, as if riding the clouds.
 */
export default function FloatingCat() {
  const [journey, setJourney] = useState(null) // { startY, endY, duration, direction, startTime }
  const [position, setPosition] = useState({ x: -120, y: 0 })
  const [visible, setVisible] = useState(false)

  // Start a new journey across the screen
  const startJourney = useCallback(() => {
    // Random vertical position in the cloud area (20-70% of viewport height)
    const startY = 20 + Math.random() * 50
    // Slight vertical drift during travel
    const endY = startY + (Math.random() - 0.5) * 15
    // Duration between 12-20 seconds for a calm drift
    const duration = 12000 + Math.random() * 8000
    // Randomly pick left-to-right or right-to-left
    const direction = Math.random() > 0.5 ? 'ltr' : 'rtl'

    setJourney({ startY, endY, duration, direction, startTime: Date.now() })
    setVisible(true)
  }, [])

  // Schedule recurring appearances
  useEffect(() => {
    // First appearance after 3-6 seconds
    const initialDelay = 3000 + Math.random() * 3000
    let timeout = setTimeout(startJourney, initialDelay)

    return () => clearTimeout(timeout)
  }, [startJourney])

  // Animate the cat position
  useEffect(() => {
    if (!journey) return

    let animId

    function animate() {
      const elapsed = Date.now() - journey.startTime
      const progress = Math.min(elapsed / journey.duration, 1)

      // Smooth ease-in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      // Horizontal: travel across the viewport
      const sidebarWidth = 38 // sidebar takes ~38% width
      const travelStart = journey.direction === 'ltr' ? sidebarWidth : 105
      const travelEnd = journey.direction === 'ltr' ? 105 : sidebarWidth
      const x = travelStart + (travelEnd - travelStart) * eased

      // Vertical: slight sine wobble for a floating feel + drift
      const baseY = journey.startY + (journey.endY - journey.startY) * eased
      const wobble = Math.sin(progress * Math.PI * 4) * 1.5
      const y = baseY + wobble

      setPosition({ x, y })

      if (progress < 1) {
        animId = requestAnimationFrame(animate)
      } else {
        // Journey complete — hide and schedule next one
        setVisible(false)
        setJourney(null)
        const nextDelay = 8000 + Math.random() * 15000 // 8-23 seconds between appearances
        setTimeout(startJourney, nextDelay)
      }
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [journey, startJourney])

  // Flip the cat based on travel direction
  const isFlipped = journey?.direction === 'rtl'

  return (
    <div
      id="floating-cat"
      style={{
        position: 'fixed',
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: 5, // above canvas, below sidebar
        transform: `translate(-50%, -50%) scaleX(${isFlipped ? -1 : 1})`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.5s ease',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.4))',
      }}
    >
      <img
        src={catGif}
        alt="A little cat drifting across the sky"
        style={{
          width: '80px',
          height: 'auto',
          imageRendering: 'auto',
        }}
      />
    </div>
  )
}
