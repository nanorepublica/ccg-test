import React, { Fragment } from "react"
import { navigate, StaticQuery, graphql } from "gatsby"
import { handleLogin, isLoggedIn, getUser } from "../services/auth"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event, validUsers) => {
    event.preventDefault()
    handleLogin(this.state, validUsers.allUsersJson.edges)
    const pk = getUser().pk
    navigate(`/app/user/${pk}`)
  }

  render() {
    if (isLoggedIn()) {
      const pk = getUser().pk
      navigate(`/app/user/${pk}`)
    }

    return (
      <StaticQuery
        query={graphql`
          query UserQuery {
            allUsersJson {
              edges {
                node {
                  pk
                  username
                  password
                }
              }
            }
          }
        `}
        render={data => (
          <Fragment>
            <h1>Log in</h1>
            <form
              method="post"
              onSubmit={event => {
                this.handleSubmit(event, data)
              }}
            >
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  onChange={this.handleUpdate}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  onChange={this.handleUpdate}
                />
              </label>
              <input type="submit" value="Log In" />
            </form>
          </Fragment>
        )}
      />
    )
  }
}

export default Login
