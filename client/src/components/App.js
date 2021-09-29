
import * as S from './style';
import logo from '../assets/logo.svg';

function App() {
  return (
    <S.AppContainer>
      <S.AppHeader>
        <S.AppLogo src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <S.AppLink
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </S.AppLink>
      </S.AppHeader>
    </S.AppContainer>
  );
}

export default App;
