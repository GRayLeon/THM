export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start, end, progress) {
  return start + (end - start) * progress
}
