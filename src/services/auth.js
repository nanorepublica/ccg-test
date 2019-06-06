// Adapted from https://www.gatsbyjs.org/tutorial/authentication-tutorial/

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }, validUsers) => {
  const currentPossibleUsers = validUsers.filter(
    ({ node }) => username === node.username && password === node.password
  )
  if (currentPossibleUsers.length === 1) {
    const user = currentPossibleUsers[0].node
    return setUser({
      username: user.username,
      pk: user.pk,
    })
  }

  return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const hasPermission = userId => {
  const user = getUser()
  return user.pk === parseInt(userId)
}

export const logout = callback => {
  setUser({})
  callback()
}
