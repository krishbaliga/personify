import loadingGIF from '../../assets/loading-screen.gif'
import '../../Styles/LoadingScreen.css'

function LoadingScreen() {
    return(
        <>  
            <div className="loading-screen-container">
                <img className="loading-gif" src={loadingGIF}></img>
                <div className='loading-sub-text'>We are currently analyzing your Spotify data. In the meantime, have fun looking at these cute cats!</div>
            </div>
        </>
    )
}

export default LoadingScreen;