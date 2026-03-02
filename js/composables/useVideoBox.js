import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export function useVideoBox() {
  const isOpenVideoBox = ref(false)

  const tempVideoUrl = ref('')

  const openVideoBox = (imageUrl) => {
    tempVideoUrl.value = imageUrl
    isOpenVideoBox.value = true
  }

  const closeVideoBox = () => {
    tempVideoUrl.value = ''
    isOpenVideoBox.value = false
  }

  return { isOpenVideoBox, tempVideoUrl, openVideoBox, closeVideoBox }
}
