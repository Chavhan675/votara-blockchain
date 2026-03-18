export const isEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

export const isRequired = (value) => {
  return value && value.trim().length > 0
}

export const minLength = (value, length) => {
  return value.length >= length
}