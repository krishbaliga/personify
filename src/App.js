import { useState, useEffect } from 'react';
import HomePage from './screens/Homepage';
import './App.css';
import './static/css/home.css'

function App() {
  const [accessToken, setAccessToken] = useState("");
  
  return (
    <div className="App">
      <HomePage accessToken={accessToken} setAccessToken={setAccessToken} />
    </div>
  );
}

export default App;
