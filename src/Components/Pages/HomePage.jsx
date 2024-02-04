function HomePage() {
    const CLIENT_ID = process.env.CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "code";
    const SCOPE = "playlist-read-private, user-top-read, playlist-modify-public, playlist-modify-private";

    return (
        <div className="homepage-container">
            <i className='logo'>personify</i>
            <i className='sub logo'>personify</i>
            <a onClick href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                <button className='large-btn'><i>login</i></button>
            </a>
        </div>
    )
}

export default HomePage;