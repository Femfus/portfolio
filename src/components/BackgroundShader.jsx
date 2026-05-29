import { useEffect, useRef } from 'react'

// ─── GLSL Vertex Shader ─────────────────────────────────────
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// ─── GLSL Fragment Shader (Procedural Sky + Clouds) ─────────
const fragmentShaderSource = `
  precision highp float;

  uniform vec2  u_resolution;
  uniform float u_time;

  /* ── Simplex-style hash helpers ────────────────────────── */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  /* 2D simplex noise (Ashima / Stefan Gustavson) */
  float snoise(vec2 v) {
    const vec4 C = vec4(
       0.211324865405187,   // (3.0-sqrt(3.0))/6.0
       0.366025403784439,   //  0.5*(sqrt(3.0)-1.0)
      -0.577350269189626,   // -1.0 + 2.0 * C.x
       0.024390243902439    //  1.0 / 41.0
    );

    // First corner
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    // Other corners
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Permutations
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));

    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;

    // Gradients
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;

    return 130.0 * dot(m, g);
  }

  /* ── Fractal Brownian Motion ───────────────────────────── */
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // Aspect-correct coordinates
    vec2 p = uv;
    p.x *= u_resolution.x / u_resolution.y;

    float time = u_time * 0.035;

    /* ── Dark sky gradient (deep purple → wine → dusky rose) ── */
    vec3 skyTop    = vec3(0.06, 0.04, 0.14);   // near-black violet
    vec3 skyMid    = vec3(0.18, 0.06, 0.22);   // deep plum
    vec3 skyBottom = vec3(0.35, 0.10, 0.18);   // dusky crimson-rose
    vec3 sky = mix(skyBottom, skyMid, smoothstep(0.0, 0.45, uv.y));
    sky = mix(sky, skyTop, smoothstep(0.45, 1.0, uv.y));

    /* ── Cloud layer 1 (large, slow) ─────────────────────── */
    vec2 cloudUV1 = p * 1.8 + vec2(time * 0.6, 0.0);
    float cloud1  = fbm(cloudUV1);
    cloud1 = smoothstep(-0.05, 0.50, cloud1);

    /* ── Cloud layer 2 (medium, moderate speed) ──────────── */
    vec2 cloudUV2 = p * 3.0 + vec2(time * 1.0, 0.3);
    float cloud2  = fbm(cloudUV2);
    cloud2 = smoothstep(0.0, 0.48, cloud2);

    /* ── Cloud layer 3 (small detail, faster) ────────────── */
    vec2 cloudUV3 = p * 5.0 + vec2(time * 1.5, -0.2);
    float cloud3  = fbm(cloudUV3);
    cloud3 = smoothstep(0.05, 0.50, cloud3);

    /* ── Combine clouds ──────────────────────────────────── */
    float clouds = cloud1 * 0.5 + cloud2 * 0.3 + cloud3 * 0.2;

    // Fade clouds near edges for softness
    float vertFade = smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.88, uv.y);
    clouds *= vertFade;

    // Cloud color: muted pink-lavender with slight variation by height
    vec3 cloudColorLow  = vec3(0.55, 0.22, 0.30);  // warm rose
    vec3 cloudColorHigh = vec3(0.35, 0.20, 0.40);  // cool lavender
    vec3 cloudColor = mix(cloudColorLow, cloudColorHigh, uv.y);

    // Blend clouds onto sky
    vec3 color = mix(sky, cloudColor, clouds * 0.7);

    // Warm pink-red glow near lower-right (moon / distant light)
    float glow1 = exp(-3.5 * length(uv - vec2(0.75, 0.12)));
    color += vec3(0.30, 0.08, 0.12) * glow1;

    // Subtle purple glow upper-left
    float glow2 = exp(-5.0 * length(uv - vec2(0.2, 0.85)));
    color += vec3(0.12, 0.05, 0.20) * glow2;

    // Faint stars (subtle noise sparkle in dark areas)
    float starNoise = snoise(uv * 120.0 + time * 0.2);
    float starMask = smoothstep(0.92, 0.98, starNoise) * smoothstep(0.5, 0.85, uv.y) * (1.0 - clouds);
    color += vec3(0.7, 0.6, 0.8) * starMask * 0.4;

    gl_FragColor = vec4(color, 1.0);
  }
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    return null
  }
  return program
}

export default function BackgroundShader() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    // Compile shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    const program = createProgram(gl, vertexShader, fragmentShader)

    // Full-screen quad
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1,
    ]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')

    // Resize handler
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Render loop
    let animationId
    const startTime = performance.now()

    function render() {
      const elapsed = (performance.now() - startTime) / 1000.0

      gl.useProgram(program)

      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, elapsed)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="bg-shader-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
