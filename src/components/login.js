import React, { Fragment } from "react"
import { navigate, StaticQuery, graphql } from "gatsby"
import { handleLogin, isLoggedIn, getUser } from "../services/auth"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
    errorMsg: ``,
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
    if (pk !== undefined) {
      navigate(`/app/user/${pk}`)
    } else {
      this.setState({
        username: ``,
        password: ``,
        errorMsg: "Incorrect Username or Password. Please try again.",
      })
      event.target.reset()
    }
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
          <div
            style={{
              marginTop: "200px",
              marginBottom: "200px",
              display: "grid",
              gridTemplateRows: "auto auto auto",
              gridTemplateColumns: "auto auto auto auto",
            }}
          >
            <h1 style={{ gridColumnStart: 3 }}>Log in</h1>
            {this.state.errorMsg && (
              <p
                style={{
                  backgroundColor: "#ef9a9a",
                  border: "1px solid #c62828",
                  color: "#444",
                  marginRight: "auto",
                  padding: "10px",
                  gridColumnStart: 3,
                  gridRowStart: 2,
                  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
                }}
              >
                {this.state.errorMsg}
              </p>
            )}
            <form
              method="post"
              onSubmit={event => {
                this.handleSubmit(event, data)
              }}
              style={{
                gridColumnStart: 3,
                gridRowStart: 3,
                display: "grid",
                gridTemplateRows: "30px 30px 35px",
                gridTemplateColumns: "100px 300px",
                gridGap: "5px 20px",
              }}
            >
              <label>Username:</label>
              <input type="text" name="username" onChange={this.handleUpdate} />
              <label>Password:</label>
              <input
                type="password"
                name="password"
                onChange={this.handleUpdate}
              />
              <input
                style={{ gridColumnStart: "span 2", alignSelf: "end" }}
                type="submit"
                value="Log In"
              />
            </form>
          </div>
        )}
      />
    )
  }
}

export default Login
