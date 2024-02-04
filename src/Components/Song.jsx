function Song({name, src}) {
    return(
        <div className="song-container">
            <img className="song-img" src={src}></img>
            <p className="song-name">{name}</p>
        </div>
    )
}

export default Song;