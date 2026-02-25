import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export function useSlideBox() {
  const isOpenBox = ref(false)

  const tempImageUrl = ref('')

  const openBox = (imageUrl) => {
    tempImageUrl.value = imageUrl
    isOpenBox.value = true
  }

  const closeBox = () => {
    tempImageUrl.value = ''
    isOpenBox.value = false
  }

  return { isOpenBox, tempImageUrl, openBox, closeBox }
}
