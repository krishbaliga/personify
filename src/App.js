import { useState, useEffect } from 'react';
import HomePage from './Homepage';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState("");
  
  return (
    <div className="App">
      <HomePage accessToken={accessToken} setAccessToken={setAccessToken} />
    </div>
  );
}

export default App;
