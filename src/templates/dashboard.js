import React from "react"

import { graphql } from "gatsby"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import BasicDash from "../components/dash"

const Dashboard = ({ data }) => {
  const { usersJson, allPatientsJson, allSamplesJson } = data
  return (
    <Router>
      <PrivateRoute
        path="/app/user/:userId"
        component={BasicDash}
        data={{ usersJson, allPatientsJson }}
      />
      <PrivateRoute
        path="/app/user/:userId/patient/:patientId"
        component={BasicDash}
        data={{ usersJson, allPatientsJson, allSamplesJson }}
      />
    </Router>
  )
}

export default Dashboard

export const query = graphql`
  query UserPatientQuery($userID: Int, $patientID: Int) {
    usersJson(pk: { eq: $userID }) {
      pk
      firstname
      dateOfBirth
      institute
      middleInitial
      lastname
      username
      title
    }
    allPatientsJson(filter: { userId: { eq: $userID } }) {
      edges {
        node {
          pk
          firstname
          middleInitial
          lastname
          gender
          dateOfBirth
          userId
        }
      }
    }
    allSamplesJson(filter: { patientId: { eq: $patientID } }) {
      edges {
        node {
          id
          pk
          quality
          sampleType
          date
          patientId
        }
      }
    }
  }
`
