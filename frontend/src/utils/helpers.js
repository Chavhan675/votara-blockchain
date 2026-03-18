export const generateId = () => {
  return Math.random().toString(36).substring(2,9)
}

export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
}