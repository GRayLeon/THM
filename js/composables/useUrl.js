import { ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js'

export function useUrl() {
  const query = ref(getQuery())

  function getQuery() {
    return Object.fromEntries(new URLSearchParams(window.location.search))
  }

  function get(key, defaultValue = null) {
    return query.value[key] ?? defaultValue
  }

  function set(params, { replace = true } = {}) {
    const searchParams = new URLSearchParams(window.location.search)

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        searchParams.delete(key)
      } else {
        searchParams.set(key, value)
      }
    })

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    const method = replace ? 'replaceState' : 'pushState'

    window.history[method](null, '', newUrl)
    query.value = getQuery()
  }

  function remove(key) {
    set({ [key]: null })
  }

  function go(path, params = {}) {
    const searchParams = new URLSearchParams(params).toString()
    const url = searchParams ? `${path}?${searchParams}` : path
    window.location.href = url
  }

  function reload() {
    window.location.reload()
  }

  return {
    query,
    get,
    set,
    remove,
    go,
    reload,
  }
}
