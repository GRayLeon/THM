
export function getVideoThumbnail(videoUrl) {
  const videoId = getVideoId(videoUrl)
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

export function getVideoPlayer(videoUrl) {
  const videoId = getVideoId(videoUrl)
  return `https://www.youtube.com/embed/${videoId}`
}

export function getVideoId(videoUrl) {
  const url = new URL(videoUrl)
  return url.searchParams.get('v')
}