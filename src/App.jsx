import Keyboard from './Components/Keyboard';
import Board from './Components/Board';
import styled from 'styled-components';

const StyledApp = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const AppWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`

function App() {
  return (
    <StyledApp>
      <AppWrapper>
        <Board />
        <Keyboard/>
      </AppWrapper>
    </StyledApp>
  );
}

export default App;
