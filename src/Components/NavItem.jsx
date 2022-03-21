import React from 'react'
import styled from 'styled-components';

const StyledItem = styled.li`
  width: calc(var(--nav-size) * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled.a`
  --button-size: calc(var(--nav-size) * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: var(--bg);
  border: 1px solid #333;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 300ms;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2);
  };
  svg {
    fill: var(--text-color);
    stroke-width: 2.5;
    width: 1.3em;
    height: 1.3em;
  }
`

function NavItem(props) {
  return (
    <StyledItem>
      <StyledLink>
        {props.icon}
      </StyledLink>
    </StyledItem>
  )
}

export default NavItem