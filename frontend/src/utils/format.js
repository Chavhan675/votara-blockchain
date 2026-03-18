export const shortenAddress = (address) => {
  if (!address) return ""
  return address.slice(0,6) + "..." + address.slice(-4)
}

export const capitalize = (text) => {
  if (!text) return ""
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}