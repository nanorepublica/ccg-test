import React from "react"
import { Link } from "gatsby"
import { Router } from "@reach/router"

import Layout from "../components/layout"
import Login from "../components/login"

import { getUser, isLoggedIn } from "../services/auth"

const IndexPage = () => (
  <Layout>
    <h1>Hello {isLoggedIn() ? getUser().username : "world"}!</h1>

    {isLoggedIn() ? (
      <p>
        You are logged in, so check your{" "}
        <Link to={`/app/user/${getUser().pk}`}>dashboard</Link>
      </p>
    ) : (
      <Router>
        <Login path="/" />
      </Router>
    )}
  </Layout>
)

export default IndexPage
