import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const StyledItem = styled.li`
  width: calc(var(--nav-size) * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const StyledLink = styled(motion.a)`
  --button-size: calc(var(--nav-size) * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: var(--dropdown-bg);
  border: 1px solid #333;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 300ms;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
        filter: brightness(1.2);
    }
  }
  svg {
    stroke-width: 2.5;
    width: 1.3em;
    height: 1.3em;
  };
`;

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <StyledItem>
      <StyledLink onClick={() => setOpen(!open)}>
        {props.icon}
      </StyledLink>
      <AnimatePresence>
        {open && props.children}
      </AnimatePresence>
    </StyledItem>
  );
}

export default NavItem;