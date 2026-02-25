import { ref, onMounted, onUnmounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { clamp } from '../utils/scrollLerp.js'

export function useProgressBar() {
  const progress = ref(0)
  let handler

  onMounted(() => {
    const detail = document.querySelector('.positionInsideDetail')
    if (!detail) return

    handler = () => {
      const rect = detail.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      // 元素完全離開畫面時的總滾動距離
      const total = elementHeight

      // 已經滾動的距離（元素頂部從畫面底部進來開始算）
      const current = windowHeight - rect.top

      // 計算比例
      const ratio = current / total

      // 限制在 0~1
      const clamped = clamp(ratio, 0, 1)

      progress.value = clamped * 100
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
  })

  onUnmounted(() => {
    if (!handler) return
    window.removeEventListener('scroll', handler)
    window.removeEventListener('resize', handler)
  })

  return { progress }
}