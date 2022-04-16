import './App.css';
import Login from './Login';
import Configuration from './Configuration';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);

  const login = e => {
    setPhoneNumber(e)
    setLoggedIn(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!loggedIn && <Login login={login}></Login>}
        {loggedIn && <Configuration phoneNumber={phoneNumber}></Configuration>}
      </header>
    </div>
  );
}

export default App;
