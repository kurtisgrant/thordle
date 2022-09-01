import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const StyledBackdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000e1;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Backdrop({ children, onClick }) {
  return (
    <StyledBackdrop
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
      </StyledBackdrop>
  )
}

export default Backdrop