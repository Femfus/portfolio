import { useEffect, useRef } from 'react'

/**
 * Custom cursor — GPU-accelerated with will-change and translate3d.
 */
export default function CustomCursor() {
  const ringRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX, ringY = mouseY
    let prevMouseX = mouseX, prevMouseY = mouseY
    let velX = 0, velY = 0
    let smoothSpeed = 0
    let scaleX = 1, scaleY = 1
    let rotation = 0
    let animId

    function onMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    function animate() {
      velX = mouseX - prevMouseX
      velY = mouseY - prevMouseY
      const speed = Math.sqrt(velX * velX + velY * velY)
      smoothSpeed += (speed - smoothSpeed) * 0.15
      prevMouseX = mouseX
      prevMouseY = mouseY

      // Tighter follow for less perceived lag
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      const stretchFactor = Math.min(smoothSpeed / 60, 1)

      if (smoothSpeed > 1) {
        const targetAngle = Math.atan2(velY, velX) * (180 / Math.PI) + 90
        let angleDiff = targetAngle - rotation
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        rotation += angleDiff * 0.15
      }

      const targetScaleY = 1 + stretchFactor * 0.8
      const targetScaleX = 1 / Math.sqrt(targetScaleY)
      scaleX += (targetScaleX - scaleX) * 0.2
      scaleY += (targetScaleY - scaleY) * 0.2

      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`
      ring.style.opacity = 0.3 + Math.min(smoothSpeed / 30, 1) * 0.5

      animId = requestAnimationFrame(animate)
    }

    animate()

    function onLeave() { ring.style.opacity = '0' }
    function onEnter() { ring.style.opacity = '0.3' }
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      id="cursor-ring"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1.5px solid rgba(255, 255, 255, 0.5)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform, opacity',
      }}
    />
  )
}
