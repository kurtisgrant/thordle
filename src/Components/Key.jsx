import React from 'react'
import styled from 'styled-components'

const StyledKey = styled.div`
background-color: #888888;
color: #fff;
font-weight: bold;
border-radius: .4em;
width: 1.8em;
height: 3em;
display: grid;
place-items: center;
cursor: pointer;
&:hover { background-color: #777777; }
`;

function Key(props) {
  const content = props.children;
  const onClick = () => console.log('Key Pressed: ' + content);


  return (
    <StyledKey>{content.toUpperCase()}</StyledKey>
  )
}

export default Key