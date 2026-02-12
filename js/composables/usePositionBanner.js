import { onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { clamp, lerp } from '../utils/scrollLerp.js'

export function usePositionBanner() {
  let handler

  onMounted(() => {
    const banner = document.querySelector('.positionBanner')
    const content = banner?.querySelector('.positionBanner__content')
    const detail = banner?.querySelector('.detail')
    const line = banner?.querySelector('.line')

    if (!banner || !content || !detail || !line) return

    handler = () => {

      const card = banner?.querySelector('.positionBanner__card')
      const rect = banner.getBoundingClientRect()
      const vh = window.innerHeight

      const progress = clamp(window.scrollY / 248, 0, 1)
      const topOffset = lerp(124, 64, progress)

      const visibleTop = Math.max(rect.top, topOffset)
      const visibleBottom = Math.min(rect.bottom, vh)
      const height = Math.max(visibleBottom - visibleTop, 0)

      content.style.top = `${topOffset}px`
      detail.style.height = `${height}px`
      line.style.top = `${topOffset}px`

      if (card) {
        if (window.scrollY < (visibleTop + 100)) {
          card.classList.remove('hide')
        } else {
          card.classList.add('hide')
        }
      }
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
  })

  onUnmounted(() => {
    handler && window.removeEventListener('scroll', handler)
    handler && window.removeEventListener('resize', handler)
  })
}
