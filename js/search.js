import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

import { useHeaderOffset } from './composables/useHeaderOffset.js'
import { useSearchBanner } from './composables/useSearchBanner.js'
import { useUrl } from './composables/useUrl.js'
import { useSearchArea } from './composables/useSearchArea.js'
import { useNavOpen } from './composables/useNavOpen.js'

const App = {
  setup() {
    useHeaderOffset()
    useSearchBanner()

    const { go } = useUrl()
    const { isOpenSearch, openSearchArea, closeSearchArea } = useSearchArea()
    const { isOpenNav, toogleNav } = useNavOpen()
    
    return { go, isOpenSearch, openSearchArea, closeSearchArea, isOpenNav, toogleNav }
  }
}

createApp(App).mount('#app')
