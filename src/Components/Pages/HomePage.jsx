import soundWave from '../../assets/soundwave.gif'
import largeLogo from '../../assets/large-logo2.png'
function HomePage() {
    const CLIENT_ID = process.env.CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "code";
    const SCOPE = "playlist-read-private, user-top-read";

    return (
        <div className="homepage-container">
            <div className="left-container">
                <img className="large-logo" src={largeLogo}></img>
                <div className='description'>Find your MBTI based on your Spotify</div>
                <a onClick href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                    <button className='large-btn'>Login</button>
                </a>
            </div>
            <div className="right-container">
                <img className="soundwave" src={soundWave}></img>
            </div>
        </div>
    )
}

export default HomePage;