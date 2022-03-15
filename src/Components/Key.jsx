import React from 'react'
import styled from 'styled-components'

const StyledKey = styled.div`
background-color: #888888;
color: #fff;
font-weight: bold;
border-radius: .4em;
${props => props.wide ? 'min-width: 3rem;' : 'min-width: 1.2rem;'}
padding: 0 0.3rem 0 0.3rem;
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
    <StyledKey onClick={props.onClick} wide={props.wide}>{content}</StyledKey>
  )
}

export default Key