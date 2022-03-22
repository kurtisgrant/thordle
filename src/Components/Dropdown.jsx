import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import styled from 'styled-components';
import DropdownItem from './DropdownItem';
import {ReactComponent as ChevronRight} from '../assets/chevron-right.svg';
import {ReactComponent as ChevronLeft} from '../assets/chevron-left.svg';
import {ReactComponent as TrendingUp} from '../assets/trending-up.svg';
import {ReactComponent as Activity} from '../assets/activity.svg';


const StyledDropdown = styled.div`
position: absolute;
top: 58px;
width: 300px;
transform: translateX(-45%);
background-color: var(--bg);
border: var(--border);
border-radius: var(--border-radius);
padding: 1rem;
overflow: hidden;
`;

function Dropdown(props) {
  const [activeMenu, setActiveMenu] = useState('main');


  return (
    <StyledDropdown className="dropdown">
      <AnimatePresence initial={false} exitBeforeEnter>

        {activeMenu === 'main' && <motion.div
          key='main'
          transition={{ type: 'tween', duration: 0.4 }}
          initial={{ x: "-110%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-110%" }}
        >
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem 
          leftIcon={<TrendingUp />}
          rightIcon={<ChevronRight />} 
          click={() => setActiveMenu('trends')}
          >Trends</DropdownItem>
          <DropdownItem 
          leftIcon={<Activity />}
          rightIcon={<ChevronRight />} 
          >Hello</DropdownItem>
        </ motion.div>}

        {activeMenu === 'trends' && <motion.div
          key='trends'
          transition={{ type: 'tween', duration: 0.4 }}
          initial={{ x: "110%" }}
          animate={{ x: "0%" }}
          exit={{ x: "110%" }}
        >
          <DropdownItem 
          leftIcon={<ChevronLeft />}
          click={() => setActiveMenu('main')}
          >Back</DropdownItem>
          <DropdownItem 
          leftIcon={<Activity />}
          rightIcon={<ChevronRight />} 
          >Hello</DropdownItem>
        </ motion.div>}

      </AnimatePresence>
    </StyledDropdown>
  )
}

export default Dropdown