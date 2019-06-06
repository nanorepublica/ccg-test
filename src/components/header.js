import PropTypes from "prop-types"
import React from "react"

import { Link, navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 20px`,
        maxWidth: "100vw",
        padding: `1.45rem 1.0875rem`,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      {` `}
      {isLoggedIn() ? (
        <h3 style={{ marginTop: "auto", marginBottom: "auto" }}>
          <a
            style={{
              color: `white`,
            }}
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/`))
            }}
          >
            Logout
          </a>
        </h3>
      ) : null}
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
