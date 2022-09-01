import React from 'react'
import styled from 'styled-components'

import Modal from './Modal'

function UserStatsModal({handleClose, userStats}) {
  return (
    <Modal handleClose={handleClose}>{JSON.stringify(userStats)}</Modal>
  )
}

export default UserStatsModal