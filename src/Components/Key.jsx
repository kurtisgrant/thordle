import React from 'react';
import styled from 'styled-components';

const colorMapping = {
  absent: '#555555',
  present: '#bf9f3b',
  confirmed: '#538d4e'
};

const StyledKey = styled.div`
background-color: ${props => colorMapping[props.state] || '#888888'};
color: #fff;
font-weight: bold;
border-radius: .4em;
min-width: ${props => props.wide ? '3rem;' : '1.2rem;'}
padding: 0 0.3rem 0 0.3rem;
height: 3em;
display: grid;
place-items: center;
cursor: pointer;
&:hover { opacity: 0.8; }
`;

function Key(props) {
  const content = props.children;
  const onClick = () => console.log('Key Pressed: ' + content);


  return (
    <StyledKey {...props}>{content}</StyledKey>
  );
};

export default Key;