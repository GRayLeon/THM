import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export function useNavOpen() {
  const isOpenNav = ref(false)
  const toogleNav = () => {
    isOpenNav.value = !isOpenNav.value
  }

  return { isOpenNav, toogleNav }
}

