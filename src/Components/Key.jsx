import React from 'react';
import styled from 'styled-components';

const colorMapping = {
  absent: '#444',
  present: '#bf9f3b',
  confirmed: '#538d4e'
};

const StyledKey = styled.div`
background-color: ${props => colorMapping[props.state] || '#888888'};
color: var(--text-color);
font-weight: bold;
border-radius: .4em;
width: ${props => props.wide ? '3rem;' : '1.5rem;'};
padding: 0 0.3rem 0 0.3rem;
height: 100%;
display: grid;
place-items: center;
cursor: pointer;
user-select: none;
&:hover { opacity: 0.8; };
svg {
  stroke: var(--text-color);
  stroke-width: 2.2;
  width: 1.5em;
  height: 1.5em;
}
`;

function Key(props) {
  const content = props.children;
  return (
    <StyledKey {...props}>{content}</StyledKey>
  );
};

export default Key;