import { useEffect, useRef } from 'react'

const CHARS = ' .·:;░▒▓█'

export default function AsciiSphere() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const FONT_SIZE = 12

    // Generate sphere surface points
    const points = []
    const PHI_STEPS = 30
    const THETA_STEPS = 48
    for (let i = 0; i <= PHI_STEPS; i++) {
      const phi = (Math.PI * i) / PHI_STEPS
      for (let j = 0; j < THETA_STEPS; j++) {
        const theta = (2 * Math.PI * j) / THETA_STEPS
        points.push({
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.sin(phi) * Math.sin(theta),
          z: Math.cos(phi),
          v: i / PHI_STEPS,
        })
      }
    }

    let w = 0, h = 0, dpr = 1

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let animId
    const startTime = performance.now()
    let frame = 0

    // Pre-compute light direction (normalized)
    const lLen = Math.sqrt(0.25 + 0.36 + 0.36)
    const lx = -0.5 / lLen, ly = -0.6 / lLen, lz = 0.6 / lLen

    function render() {
      frame++
      if (frame % 2 !== 0) {
        animId = requestAnimationFrame(render)
        return
      }

      const t = (performance.now() - startTime) / 1000
      ctx.clearRect(0, 0, w, h)

      // Bottom-right corner, partially off-screen
      const planetScale = Math.min(w, h) * 0.22
      const centerX = w - planetScale * 0.55
      const centerY = h - planetScale * 0.4

      // Slow rotation with axial tilt
      const rotY = t * 0.1
      const rotX = 0.35
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

      ctx.font = `${FONT_SIZE}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Atmospheric glow
      const glowR = planetScale * 1.4
      const glow = ctx.createRadialGradient(centerX, centerY, planetScale * 0.5, centerX, centerY, glowR)
      glow.addColorStop(0, 'rgba(140, 50, 100, 0.07)')
      glow.addColorStop(0.6, 'rgba(100, 30, 80, 0.03)')
      glow.addColorStop(1, 'rgba(60, 20, 60, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(centerX, centerY, glowR, 0, Math.PI * 2)
      ctx.fill()

      // Render points
      for (const p of points) {
        let x = p.x * cosY + p.z * sinY
        let y = p.y
        let z = -p.x * sinY + p.z * cosY

        const y2 = y * cosX - z * sinX
        const z2 = y * sinX + z * cosX
        y = y2
        z = z2

        if (z < 0) continue

        // Screen position
        const sx = centerX + x * planetScale
        const sy = centerY + y * planetScale

        // Skip if way off-screen (small buffer)
        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) continue

        // Lighting
        const brightness = Math.max(0, x * lx + y * ly + z * lz)

        // Latitude bands for surface detail
        const bandShift = Math.sin(p.v * 10 * Math.PI) * 0.08
        const finalBright = Math.max(0, Math.min(1, brightness + bandShift))

        const charIdx = Math.min(finalBright * (CHARS.length - 1) | 0, CHARS.length - 1)
        if (charIdx === 0) continue

        // Color: deep purple shadow → crimson-rose lit areas
        const lat = 1 - Math.abs(p.v - 0.5) * 2
        const r = (35 + finalBright * 150 + lat * 25) | 0
        const g = (10 + finalBright * 35) | 0
        const b = (40 + finalBright * 90 + lat * 15) | 0
        const alpha = 0.25 + finalBright * 0.75

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fillText(CHARS[charIdx], sx, sy)
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="ascii-sphere-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
}
