import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import DropdownItem from './DropdownItem';
import { ReactComponent as ChevronRight } from '../assets/chevron-right.svg';
import { ReactComponent as ChevronLeft } from '../assets/chevron-left.svg';
import { ReactComponent as TrendingUp } from '../assets/trending-up.svg';
import { ReactComponent as HelpCircle } from '../assets/help-circle.svg';
import { ReactComponent as Feedback } from '../assets/send.svg';

const StyledDropdown = styled(motion.div)`
  position: absolute;
  top: 58px;
  width: 300px;
  transform: translateX(-45%);
  background-color: var(--dropdown-bg);
  border: var(--border);
  border-radius: var(--border-radius);
  padding: 1rem;
  overflow: hidden;
`;

function Dropdown(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef(null);

  const calcHeight = () => setMenuHeight(menuRef.current.offsetHeight);

  useEffect(calcHeight, []);

  return (
    <StyledDropdown
      animate={{ height: menuHeight, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      initial={{ height: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.4 }}
    >

      <AnimatePresence initial={false} exitBeforeEnter>

        {activeMenu === 'main' && <motion.div
          key='main'
          ref={menuRef}
          transition={{ type: 'tween', duration: 0.4 }}
          initial={{ x: "-110%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-110%" }}
          onAnimationStart={calcHeight}
        >
          <DropdownItem
            leftIcon={<HelpCircle />}
            click={() => props.openModal('instructions')}
          >Instructions</DropdownItem>
          <DropdownItem
            leftIcon={<TrendingUp />}
            click={() => props.openModal('stats')}
          >My Stats</DropdownItem>
          <DropdownItem
            leftIcon={<Feedback />}
            href="https://forms.gle/SfDUnEa6hgD8bKuCA"
          >Submit Feedback</DropdownItem>
        </ motion.div>
        }

      </AnimatePresence>
    </StyledDropdown>
  );
}

export default Dropdown;