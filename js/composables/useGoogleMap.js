import { ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'
import { getQueryParam } from '../utils/getQueryParams.js'
import { createMapStyle } from '../constants/mapStyle.js'
import { positionList } from '../mock/position.js'

let googleMapsPromise = null


// 確保 map api 已載入
function loadGoogleMaps() {
  if (googleMapsPromise) return googleMapsPromise

  googleMapsPromise = new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google)
      return
    }

    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async'
    script.async = true

    script.onload = () => {
      resolve(window.google)
    }

    script.onerror = reject

    document.head.appendChild(script)
  })

  return googleMapsPromise
}


// 處理 zoom in / out 問題
function setupCustomZoom(map) {
  const zoomInBtn = document.querySelector('.zoom-in')
  const zoomOutBtn = document.querySelector('.zoom-out')

  if (!zoomInBtn || !zoomOutBtn) return

  zoomInBtn.addEventListener('click', () => {
    map.setZoom(map.getZoom() + 1)
  })

  zoomOutBtn.addEventListener('click', () => {
    map.setZoom(map.getZoom() - 1)
  })
}

// icon 圖片路徑
function getIconNormal() {
  return {
    url: '/images/btn--position.svg',
    scaledSize: new google.maps.Size(32, 32),
    anchor: new google.maps.Point(16, 32),
  }
}

function getIconActive() {
  return {
    url: '/images/btn--position.svg',
    scaledSize: new google.maps.Size(48, 48),
    anchor: new google.maps.Point(24, 48),
  }
}

// marker 實例容器
const markerInstances = []
let activeMarker = null

// 設定 active marker
function setActiveMarker(marker) {
  if (activeMarker) {
    activeMarker.setIcon(getIconNormal())
  }

  marker.setIcon(getIconActive())
  activeMarker = marker
}

// 建立 marker
function createMarkers(map, markerList) {
  markerList.forEach(item => {
    const marker = new google.maps.Marker({
      position: item.position,
      title: item.title,
      map,
      icon: getIconNormal(),
    })

    marker.addListener('click', () => {
      currentPostion.value = item 
      setActiveMarker(marker)
    })

    markerInstances.push(marker)
  })
}

// 目前選擇的 position
export const currentPostion = ref(null)

// 載入地圖
export function useGoogleMap() {
  onMounted( async () => {
    const mapContainer = document.getElementById('map')
    if (!mapContainer) return

    await loadGoogleMaps()

    const categoryId = getQueryParam('categoryId')

    // TODO: 透過 API 取得
    const category = positionList.find(
      item => item.categoryId === categoryId
    )

    if (!categoryId) return

    const map = new google.maps.Map(mapContainer, {
      center: category.center,
      zoom: 15,
      styles: createMapStyle(category.keyColor),
      disableDefaultUI: true,
      gestureHandling: 'greedy',
    })

    setupCustomZoom(map)

    createMarkers(map, category.markers)
  })
}