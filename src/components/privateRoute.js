import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, hasPermission, isBrowser } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  // The below conditional checks whether the user is logged in or not
  // If they are logged in then check whether they have access to this page
  if (
    (!isLoggedIn() && location.pathname !== `/`) ||
    (isLoggedIn() && !hasPermission(rest.userId) && location.pathname !== `/`)
  ) {
    // If the user is not logged in, redirect to the login page.
    isBrowser() && navigate(`/`)
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute
