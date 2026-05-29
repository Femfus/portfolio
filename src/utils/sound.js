import clickSfx from '../sfx/click.mp3'

let audio = null

export function playClick() {
  // Reuse a single Audio instance, reset and play
  if (!audio) {
    audio = new Audio(clickSfx)
    audio.volume = 0.4
  }
  audio.currentTime = 0
  audio.play().catch(() => {})
}
