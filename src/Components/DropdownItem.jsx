import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a`
height: 50px;
display: flex;
align-items: center;
border-radius: var(--border-radius);
transition: background var(--speed);
padding: 0.5rem 1rem;
@media (hover: hover) {
  &:hover {
      background-color: var(--bg-accent);
    }
  }
`;

const StyledIconLeft = styled.span`
  --button-size: calc(var(--nav-size) * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 300ms;
  cursor: pointer;
  svg {
    stroke-width: 2.5;
    width: 1.3em;
    height: 1.3em;
  }
`;

const StyledIconRight = styled.span`
margin-left: auto;
`;

function DropdownItem(props) {
  return (
    <StyledLink href={props.href ? props.href : "#"} target={props.href && "_blank"} onClick={props.click && props.click}>
      {props.leftIcon && <StyledIconLeft>{props.leftIcon}</StyledIconLeft>}
      {props.children}
      <StyledIconRight>{props.rightIcon}</StyledIconRight>
    </StyledLink>
  );
}

export default DropdownItem;