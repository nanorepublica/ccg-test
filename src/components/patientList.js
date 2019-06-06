import React from "react"

import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMale, faFemale } from "@fortawesome/free-solid-svg-icons"

const Patient = ({ patient, activePatient }) => {
  const genderIcon = patient.gender === "Male" ? faMale : faFemale
  const activeStyle =
    activePatient.pk === patient.pk
      ? { backgroundColor: "#639", color: "#fff" }
      : {}
  return (
    <tr key={patient.pk} style={activeStyle}>
      <td>
        <Link
          to={`/app/user/${patient.userId}/patient/${patient.pk}`}
          style={activeStyle}
        >
          {`${patient.firstname} ${patient.middleInitial} ${patient.lastname}`}
        </Link>
      </td>
      <td>
        <FontAwesomeIcon icon={genderIcon} />
      </td>
      <td>{patient.dateOfBirth}</td>
    </tr>
  )
}

const PatientList = ({ patients, activePatient }) => (
  <>
    <h3>Patient List</h3>
    <table>
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Gender</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        {patients.edges.map(({ node }) => (
          <Patient key={node.pk} patient={node} activePatient={activePatient} />
        ))}
      </tbody>
    </table>
  </>
)

export default PatientList
