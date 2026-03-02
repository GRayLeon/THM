import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export function useSlideBox() {
  const isOpenSlideBox = ref(false)

  const tempImageUrl = ref('')

  const openSlideBox = (imageUrl) => {
    tempImageUrl.value = imageUrl
    isOpenSlideBox.value = true
  }

  const closeSlideBox = () => {
    tempImageUrl.value = ''
    isOpenSlideBox.value = false
  }

  return { isOpenSlideBox, tempImageUrl, openSlideBox, closeSlideBox }
}
