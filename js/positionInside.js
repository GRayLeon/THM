import { ref, computed, onMounted, createApp, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

import { useHeaderOffset } from './composables/useHeaderOffset.js'
import { usePositionInsideBanner } from './composables/usePositionInsideBanner.js'
import { useUrl } from './composables/useUrl.js'
import { useSearchArea } from './composables/useSearchArea.js'
import { useNavOpen } from './composables/useNavOpen.js'
import { positionList } from './mock/position.js'
import { useSlideBox } from './composables/useSlideBox.js'
import { useVideoBox } from './composables/useVideoBox.js'
import { useProgressBar } from './composables/useProgressBar.js'
import { getVideoId, getVideoPlayer, getVideoThumbnail } from './composables/useVideoInfo.js'
import { shareLink, isCopied } from './composables/useShareLink.js'

createApp({
  setup() {
    const isAppReady = ref(false)

    useHeaderOffset()
    usePositionInsideBanner()
    
    const { go, get } = useUrl()
    const { isOpenSearch, openSearchArea, closeSearchArea } = useSearchArea()
    const { isOpenNav, toogleNav } = useNavOpen()

    const categoryId = get('categoryId')
    const positionId = get('positionId')

    const category = computed(() => {
      return positionList.find(item => item.categoryId === categoryId)
    })

    const position = computed(() => {
      return category.value.markers.find(item => item.id === positionId)
    })

    const { openSlideBox, closeSlideBox, isOpenSlideBox, tempImageUrl } = useSlideBox()
    const { openVideoBox, closeVideoBox, isOpenVideoBox, tempVideoUrl } = useVideoBox()

    const { progress } = useProgressBar()
    
    onMounted( async () => {
      const swiper = new window.Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
        speed: 600,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      })

      await nextTick()
      isAppReady.value = true
    })

    return { 
      isAppReady,
      go,
      isOpenSearch, openSearchArea, closeSearchArea,
      isOpenNav, toogleNav, 
      categoryId, positionId, category, position, 
      openSlideBox, closeSlideBox, isOpenSlideBox, tempImageUrl,
      openVideoBox, closeVideoBox, isOpenVideoBox, tempVideoUrl, 
      progress, shareLink, isCopied,
      getVideoId, getVideoPlayer, getVideoThumbnail
    }
  }
}).mount('#app')
