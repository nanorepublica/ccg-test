import React from "react"
import { Router, Redirect } from "@reach/router"

import Layout from "../components/layout"
import Login from "../components/login"

import { getUser, isLoggedIn } from "../services/auth"

const IndexPage = () => (
  <Layout>
    {isLoggedIn() ? (
      <Router>
        <Redirect from="/" to={`/app/user/${getUser().pk}`} />
      </Router>
    ) : (
      <Router>
        <Login path="/" />
      </Router>
    )}
  </Layout>
)

export default IndexPage
