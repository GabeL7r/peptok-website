import './App.css';
import Login from './Login';
import Configuration from './Configuration';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = e => {
    setLoggedIn(e)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!loggedIn && <Login login={login}></Login>}
        {loggedIn && <Configuration></Configuration>}
      </header>
    </div>
  );
}

export default App;
