import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

import { useHeaderOffset } from './composables/useHeaderOffset.js'
import { usePositionInsideBanner } from './composables/usePositionInsideBanner.js'
import { useUrl } from './composables/useUrl.js'
import { useSearchArea } from './composables/useSearchArea.js'
import { useNavOpen } from './composables/useNavOpen.js'

createApp({
  setup() {
    useHeaderOffset()
    usePositionInsideBanner()
    
    const { go } = useUrl()
    const { isOpenSearch, openSearchArea, closeSearchArea } = useSearchArea()
    const { isOpenNav, toogleNav } = useNavOpen()

    return { go, isOpenSearch, openSearchArea, closeSearchArea, isOpenNav, toogleNav }
  }
}).mount('#app')
