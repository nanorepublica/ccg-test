import React from "react"

import { Timeline, Event } from "react-timeline-scribble"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMeh, faSmile, faFrown } from "@fortawesome/free-regular-svg-icons"

const qualityIcon = quality =>
  quality === "high" ? faSmile : quality === "medium" ? faMeh : faFrown

const qualityColor = quality =>
  quality === "high" ? "green" : quality === "medium" ? "orange" : "red"

const SampleTimeline = ({ samples, activePatient }) => {
  if (samples !== undefined) {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <h3>
            Samples for {activePatient.firstname} {activePatient.middleInitial}{" "}
            {activePatient.lastname}
          </h3>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
            }}
          >
            <Timeline>
              {samples.edges
                .filter(({ node }) => node.patientId === activePatient.pk)
                .map(({ node }) => (
                  <Event
                    key={node.pk}
                    interval={node.date}
                    style={{ color: qualityColor(node.quality) }}
                  >
                    <ul
                      style={{
                        listStyleType: "none",
                      }}
                    >
                      <li>Type: {node.sampleType}</li>
                      <li>
                        Quality:{" "}
                        <FontAwesomeIcon
                          icon={qualityIcon(node.quality)}
                          style={{ color: qualityColor(node.quality) }}
                        />
                      </li>
                    </ul>
                  </Event>
                ))}
            </Timeline>
          </div>
        </div>
      </>
    )
  }
}

export default SampleTimeline
