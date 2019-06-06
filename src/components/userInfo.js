import React, { Fragment } from "react"

const UserInfo = ({ user }) => (
  <Fragment>
    <h2>
      {user.title} {user.firstname} {user.middleInitial} {user.lastname}{" "}
    </h2>
    <h4>
      Institute: {user.institute}
      <hr
        style={{
          marginTop: "5px",
          marginBottom: "5px",
        }}
      />
      Date of Birth: {user.dateOfBirth}
    </h4>
  </Fragment>
)

export default UserInfo
