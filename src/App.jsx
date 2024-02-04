import { useState, useEffect } from 'react';
import './Styles/App.css';
import Header from './Components/Header';
import HomePage from './Components/Pages/HomePage';
import MBTI from './Components/Pages/MBTI';

function App() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const [code, setCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    let fetchedCode;
    const urlParams = new URLSearchParams(window.location.search);
    fetchedCode = urlParams.get('code');
    window.location.hash = "";
    setCode(fetchedCode);

    if(accessToken) {
      setAccessToken(accessToken);
    } else {
      getToken(fetchedCode);
    }
  }, [])

  const getToken = async (code) => {
    console.log(CLIENT_ID)
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    }
    const body = await fetch('https://accounts.spotify.com/api/token', payload);
    const response = await body.json();
    if(response.access_token != null) {
      setAccessToken(response.access_token)
      window.localStorage.setItem('access_token', response.access_token);
    }
  }

  return (
    <>
      {!accessToken || !code?
        <>
          <Header code={code} setCode={setCode} accessToken={accessToken} setAccessToken={setAccessToken}></Header>
          <HomePage ></HomePage>
        </>
        : 
          <MBTI accessToken={accessToken} songs={songs} setSongs={setSongs} code={code} setCode={setCode}></MBTI>
      }
    </>
  )
}

export default App
