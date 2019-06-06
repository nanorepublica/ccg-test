import React from "react"

import Layout from "./layout"
import SEO from "./seo"
import UserInfo from "./userInfo"
import PatientList from "./patientList"
import SampleTimeline from "./sampleTimeline"

const BasicDash = ({ data, patientId }) => {
  const user = data.usersJson
  const patients = data.allPatientsJson
  const samples = data.allSamplesJson
  var acitvePatient = {}
  if (patientId !== undefined) {
    acitvePatient = patients.edges.find(
      ({ node }) => node.pk === parseInt(patientId)
    ).node
  }
  return (
    <Layout>
      <SEO title="Home" />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "100px auto",
          gridGap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gridColumnStart: "span 12",
          }}
        >
          <UserInfo user={user} />
        </div>
        <div style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
          <PatientList patients={patients} activePatient={acitvePatient} />
        </div>
        <div style={{ gridColumnStart: 3, gridColumnEnd: 7 }}>
          <SampleTimeline samples={samples} activePatient={acitvePatient} />
        </div>
      </div>
    </Layout>
  )
}

export default BasicDash
