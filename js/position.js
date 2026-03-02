import { ref, computed, createApp, onMounted, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

import { useHeaderOffset } from './composables/useHeaderOffset.js'
import { usePositionBanner } from './composables/usePositionBanner.js'
import { useGoogleMap, currentPostion, isMapReady } from './composables/useGoogleMap.js'
import { useUrl } from './composables/useUrl.js'
import { getQueryParam } from './utils/getQueryParams.js'
import { useSearchArea } from './composables/useSearchArea.js'
import { useNavOpen } from './composables/useNavOpen.js'
import { positionList } from './mock/position.js'
import { useSlideBox } from './composables/useSlideBox.js'

const App = {
  setup() {
    const isAppReady = ref(false)

    useHeaderOffset()
    usePositionBanner()
    useGoogleMap()

    const { go } = useUrl()
    const { isOpenSearch, openSearchArea, closeSearchArea } = useSearchArea()
    const { isOpenNav, toogleNav } = useNavOpen()

    const categoryId = getQueryParam('categoryId')

    const positions = computed(() => {
      return positionList.find(item => item.categoryId === categoryId).markers
    })

    const category = computed(() => {
      return positionList.find(item => item.categoryId === categoryId)
    })

    const groupedPositions = computed(() => {
      const list = positions.value
      const result = []

      for (let i = 0; i < list.length; i += 2) {
        result.push(list.slice(i, i + 2))
      }

      return result
    })

    const { openSlideBox, closeSlideBox, isOpenSlideBox, tempImageUrl } = useSlideBox()

    onMounted( async () => {
      await nextTick()
      isAppReady.value = true
    })
    
    return { 
      isAppReady,
      currentPostion,
      go,
      isOpenSearch, openSearchArea, closeSearchArea,
      isOpenNav, toogleNav,
      groupedPositions, category,
      openSlideBox, closeSlideBox, isOpenSlideBox, tempImageUrl,
      isMapReady }
  }
}

createApp(App).mount('#app')
