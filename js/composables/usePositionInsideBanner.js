import { onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { clamp, lerp } from '../utils/scrollLerp.js'

export function usePositionInsideBanner() {
  let handler

  onMounted(() => {
    const banner = document.querySelector('.positionInsideBanner')
    const content = banner?.querySelector('.positionInsideBanner__content')
    const line = banner?.querySelector('.line')

    if (!banner || !content || !line) return

    handler = () => {
      const rect = banner.getBoundingClientRect()

      const progress = clamp(window.scrollY / 248, 0, 1)
      const topOffset = lerp(124, 64, progress)

      const visibleTop = Math.max(rect.top, topOffset)
      const height = Math.max(rect.bottom - visibleTop, 0)

      content.style.top = `calc(${topOffset}px + ${window.scrollY}px)`
      content.style.height = `${height}px`
      line.style.top = `${topOffset}px`
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
