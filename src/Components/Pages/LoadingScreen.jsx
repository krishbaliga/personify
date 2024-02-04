import loadingGIF from '../../assets/loading-screen.gif'
import cloud1 from '../../assets/cloud1.png'
import cloud2 from '../../assets/cloud2.png'
import '../../Styles/LoadingScreen.css'
let smileyFace = ":)"

function LoadingScreen() {
    return(
        <>  
            <div className="loading-screen-container">
                <img className="loading-gif" src={loadingGIF}></img>
                <div className='loading-sub-text'>have fun looking at this train while we analyze your data {smileyFace}</div>
                <img className="cloud" id="cloud1" src={cloud1}></img>
                <img className="cloud" id="cloud2" src={cloud2}></img>
            </div>
        </>
    )
}

export default LoadingScreen;