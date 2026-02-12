import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

import { useHeaderOffset } from './composables/useHeaderOffset.js'
import { useIndexBanner } from './composables/useIndexBanner.js'
import { useSearchArea } from './composables/useSearchArea.js'
import { useNavOpen } from './composables/useNavOpen.js'

createApp({
  setup() {
    useHeaderOffset()
    useIndexBanner()
    
    const { isOpenSearch, openSearchArea, closeSearchArea } = useSearchArea()
    const { isOpenNav, toogleNav } = useNavOpen()
    
    return { openSearchArea, closeSearchArea, isOpenSearch, isOpenNav, toogleNav }
  }
}).mount('#app')
