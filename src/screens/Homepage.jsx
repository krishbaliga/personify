import { useEffect } from "react";

function HomePage({accessToken, setAccessToken}) {
    const CLIENT_ID = "8713f90fe70340269c1fcde141231939";
    const CLIENT_SECRET = "143a8da446d04560b5cb2257f9be89e7";
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "code";
    const SCOPE = "playlist-read-private, user-top-read";

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');

        if(!accessToken) {
            getToken(code);
        }
    }, [])

    const getToken = async (code) => {
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
        if (response.access_token != null) {
            setAccessToken(response.access_token)
            console.log(response.access_token)
        }
    }

    return (
        <div className="homepage-container">
            <a onClick href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                <button className='large-btn'>Login</button>
            </a>
        </div>
    )
}

export default HomePage;