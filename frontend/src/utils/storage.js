export const setItem = (key, value) => {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key) => {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export const removeItem = (key) => {
  if (typeof window === "undefined") return
  localStorage.removeItem(key)
}

export const clearStorage = () => {
  if (typeof window === "undefined") return
  localStorage.clear()
}