import { computed, onMounted, createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

import { useHeaderOffset } from './composables/useHeaderOffset.js'
import { usePositionInsideBanner } from './composables/usePositionInsideBanner.js'
import { useUrl } from './composables/useUrl.js'
import { useSearchArea } from './composables/useSearchArea.js'
import { useNavOpen } from './composables/useNavOpen.js'
import { positionList } from './mock/position.js'
import { useSlideBox } from './composables/useSlideBox.js'

createApp({
  setup() {
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

    const { openBox, closeBox, isOpenBox, tempImageUrl } = useSlideBox()
    
    onMounted(() => {
      const swiper = new window.Swiper('.swiper', {
        slidesPerView: 4,
        spaceBetween: 24,
        speed: 600,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      })
    })

    return { go, isOpenSearch, openSearchArea, closeSearchArea, isOpenNav, toogleNav, categoryId, positionId, category, position, openBox, closeBox, isOpenBox, tempImageUrl }
  }
}).mount('#app')
