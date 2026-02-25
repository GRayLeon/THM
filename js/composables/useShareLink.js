import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export const isCopied = ref(false)

export function shareLink(target) {
  if (!target) return
  if (target == 'fb') {
    const url = encodeURIComponent(window.location.href)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank',
      'width=600,height=400'
    )
  } else if (target == 'line') {
    const url = encodeURIComponent(window.location.href)
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${url}`,
      '_blank',
      'width=600,height=400'
    )
  } else if (target == 'link') {
    navigator.clipboard.writeText(window.location.href)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 3000)
  }
}