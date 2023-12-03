import Entry from './entry'
import Plans from './plans'
import React from 'react'
import { Team } from './Team'
import { BodyViewer } from './BodyViewer'

 const Start = () => {
  return (
      <>
      <Entry />
      <Plans />
      <BodyViewer/>
      <Team/>
    </>
  )
}

export default Start;