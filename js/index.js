import { ref, createApp, onMounted, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

import { useHeaderOffset } from './composables/useHeaderOffset.js'
import { useIndexBanner } from './composables/useIndexBanner.js'
import { useSearchArea } from './composables/useSearchArea.js'
import { useNavOpen } from './composables/useNavOpen.js'
import { useUrl } from './composables/useUrl.js'
import { useSlideBox } from './composables/useSlideBox.js'

createApp({
  setup() {
    const isAppReady = ref(false)
    
    useHeaderOffset()
    useIndexBanner()
    
    const { isOpenSearch, openSearchArea, closeSearchArea } = useSearchArea()
    const { isOpenNav, toogleNav } = useNavOpen()

    const { go } = useUrl()

    const { openSlideBox, closeSlideBox, isOpenSlideBox, tempImageUrl } = useSlideBox()

    onMounted(async () => {
      const swiper = new window.Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        effect: 'fade',
        speed: 1000,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
      })
      await nextTick()
      isAppReady.value = true
    })
    
    return { 
      isAppReady,
      openSearchArea, closeSearchArea, isOpenSearch,
      isOpenNav, toogleNav,
      go,
      openSlideBox, closeSlideBox, isOpenSlideBox, tempImageUrl
    }
  }
}).mount('#app')
