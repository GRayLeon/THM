import { onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { clamp, lerp } from '../utils/scrollLerp.js'

export function useSearchBanner() {
  let handler

  onMounted(() => {
    const banner = document.querySelector('.searchBanner')
    const detail = banner?.querySelector('.detail')

    if (!banner || !detail) return

    handler = () => {

      const rect = banner.getBoundingClientRect()
      const vh = window.innerHeight

      const progress = clamp(window.scrollY / 248, 0, 1)
      const topOffset = lerp(124, 64, progress)

      const visibleTop = Math.max(rect.top, topOffset)
      const visibleBottom = Math.min(rect.bottom, vh)
      const height = Math.max(visibleBottom - visibleTop, 0)

      detail.style.height = `${height}px`
      detail.style.top = `${topOffset}px`
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
