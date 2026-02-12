import { onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { clamp, lerp } from '../utils/scrollLerp.js'

export function useHeaderOffset() {
  const START_OFFSET = 124
  const END_OFFSET = 64
  const TRANSITION_RANGE = 248
  let handler

  onMounted(() => {
    const header = document.querySelector('.header')
    if (!header) return

    handler = () => {
      const progress = clamp(window.scrollY / TRANSITION_RANGE, 0, 1)
      const offset = lerp(START_OFFSET, END_OFFSET, progress)
      header.style.setProperty('--header-offset', `${offset}px`)
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
  })

  onUnmounted(() => {
    handler && window.removeEventListener('scroll', handler)
  })
}

