import React from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import { ReactComponent as Menu } from '../assets/menu.svg';
import Dropdown from './Dropdown';

const StyledNav = styled.nav`
width: 100%;
height: var(--nav-size);
background-color: var(--bg);
padding: 0 1rem;
border-bottom: var(--border);
`;

const StyledList = styled.ul`
  max-width: 100%;
  margin-right: 0.4rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

function Navbar() {

  return (
    <StyledNav>
      <StyledList>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, alignSelf: 'center', textAlign: 'center', width: '100%' }}>THORDLE</div>
        <NavItem icon={<Menu />} >
          <Dropdown />
        </NavItem>
      </StyledList>
    </StyledNav>
  );
}

export default Navbar;