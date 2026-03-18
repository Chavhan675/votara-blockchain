export const ROLES = {
  ADMIN: "admin",
  VOTER: "voter"
}

export const isAdmin = (user) => {
  return user?.role === ROLES.ADMIN
}

export const isVoter = (user) => {
  return user?.role === ROLES.VOTER
}