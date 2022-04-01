import React from 'react';
import styled from 'styled-components';

const colorMapping = {
  absent: '#444',
  present: '#bf9f3b',
  confirmed: '#538d4e'
};

const colorMapping2 = {
  unknown: '#777',
  hinted: '#805285',
  absent: '#444',
  correct: '#538d4e',
  present: '#bf9f3b'
};

const StyledKey = styled.div`
background-color: ${props => colorMapping2[props.state] || '#777'};
color: #fff;
font-weight: bold;
border-radius: .4em;
width: ${props => props.wide ? '3rem;' : '1.5rem;'};
padding: 0 0.3rem 0 0.3rem;
height: 100%;
display: grid;
place-items: center;
cursor: pointer;
user-select: none;
transition-property: background-color, opacity;
transition-duration: 600ms;
transition-timing-function: ease-out;
@media (hover: hover) {
    &:hover {
        opacity: 0.8;
    }
}
`;

function Key(props) {
  const content = props.children;
  const onClick = () => console.log('Key Pressed: ' + content);


  return (
    <StyledKey {...props}>{content}</StyledKey>
  );
};

export default Key;