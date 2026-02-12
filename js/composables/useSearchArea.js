import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export const useSearchArea = () => {
  const isOpenSearch = ref(false)

  const openSearchArea = () => {
    isOpenSearch.value = true
  }

  const closeSearchArea = () => {
    isOpenSearch.value = false
  }

  return { isOpenSearch, openSearchArea, closeSearchArea }
}