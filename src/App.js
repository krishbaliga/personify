import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MBTIPage from './screens/MBTIPage';
import HomePage from './screens/HomePage';
import './App.css';
import './static/css/home.css'
import './static/css/login.css'
import './static/css/global.css'

function App() {
  const [accessToken, setAccessToken] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage accessToken={accessToken} setAccessToken={setAccessToken}/>}/>
          <Route path="/mbti" element={<MBTIPage accessToken={accessToken} setAccessToken={setAccessToken}/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
