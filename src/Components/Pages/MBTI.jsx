import { useState, useEffect, useRef } from "react";
import '../../Styles/MBTI.css'
import Header from "../Header";
import LoadingScreen from "./LoadingScreen";
import ExtraIntro from '../MBTI/ExtraIntro';
import SensInt from '../MBTI/SensInt';
import ThinkFeel from '../MBTI/ThinkFeel';
import JudgePercep from '../MBTI/JudgePercep';
import Result from "../MBTI/Result";

function MBTI({accessToken, setAccessToken, code, setCode}) {
    const [isLoading, setIsLoading] = useState(true);
    const [songs, setSongs] = useState([]);
    const topSongs = useRef([]);
    const [isExtraIntroFinished, setExtraIntroFinished] = useState(false);
    const [isSensIntFinished, setSensIntFinished] = useState(false);
    const mbti = useRef("XXXX");
    let topGenres = useRef();
    let songsToDisplay = useRef([]);

    useEffect(() => {
        if(accessToken) {
            fetchTracks();
            fetchTopItems();
        }
    }, [])

    const fetchPlaylists = async () => {
        const result = await fetch("https://api.spotify.com/v1/me/playlists", {
            method: "GET", headers: {Authorization: `Bearer ${accessToken}` }
        })
        const response = await result.json();
        if(response !== null) {
          console.log(response)
          return response;
        }
      }
    
      const fetchTracks = async () => {
        const playlists = await fetchPlaylists();
        let songsArray = [];
        for(let i = 0; i < playlists.items.length; i++) {
          if(playlists.items[i].tracks.total > 100) {
            let multiplesOf100 = Math.ceil(playlists.items[i].tracks.total/100);
            for(let j = 0; j < multiplesOf100; j++) {
              const result = await fetch(`${playlists.items[i].tracks.href}?offset=${j*100}`, {
                method: "GET", headers: {Authorization: `Bearer ${accessToken}` }
              })
              const response = await result.json();
              if(response !== null) {
                if(songsArray.some(playlist => playlist.name === playlists.items[i].name) === true) {
                  const playlist = songsArray.find(playlist => playlist.name === playlists.items[i].name);
                  playlist.songs = playlist.songs.concat(response.items)
                } else {
                  songsArray.push({
                    name: playlists.items[i].name,
                    songs: response.items,
                  })
                }
              }
            }
          } else {
            const result = await fetch(`${playlists.items[i].tracks.href}`, {
              method: "GET", headers: {Authorization: `Bearer ${accessToken}` }
            })
            const response = await result.json();
            if(response !== null) {
              songsArray.push({
                name: playlists.items[i].name,
                songs: response.items,
              })
            }
          }
        }
        setSongs(songsArray);
        console.log(songs);
    }

    const fetchTopItems = async () => {
      const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        method: "GET", headers: {Authorization: `Bearer ${accessToken}` }
      })
      const response = await result.json();
      if(response !== null) {
        const topTracksResult = await fetch(`${response.href}`, {
          method: "GET", headers: {Authorization: `Bearer ${accessToken}` }
        })
        const topTracks = await topTracksResult.json();
        if(topTracks) {
          for(let i = 0; i < topTracks.items.length; i++) {
            topSongs.current.push({
              name: topTracks.items[i].name,
              id: topTracks.items[i].id,
              src: topTracks.items[i].album.images[1].url
            })
          }
        }
      }
    }

    return(
        <>  
        <Header code={code} setCode={setCode} setSongs={setSongs} accessToken={accessToken} setAccessToken={setAccessToken}/>
        {isLoading ?
            <>
                <LoadingScreen/>
               
            </>
        :null
        }
         {songs && songs.length > 0 ?
                <>
                    <ExtraIntro songs={songs} accessToken={accessToken} setExtraIntroFinished={setExtraIntroFinished} isLoading={isLoading} topSongs={topSongs} mbti={mbti} songsToDisplay={songsToDisplay}/>
                    <SensInt songs={songs} accessToken={accessToken } setSensIntFinished={setSensIntFinished} isLoading={isLoading} mbti={mbti} topGenres={topGenres}/>
                    {(isExtraIntroFinished && isSensIntFinished) ?
                    <>
                      <ThinkFeel songs={songs} isLoading={isLoading} setIsLoading={setIsLoading} mbti={mbti}/>
                      <JudgePercep songs={songs} isLoading={isLoading} setIsLoading={setIsLoading} mbti={mbti}/>
                      <Result isLoading={isLoading} mbti={mbti} topGenres={topGenres} songsToDisplay={songsToDisplay} setIsLoading={setIsLoading} accessToken={accessToken}/>
                    </>
                      :
                      null
                    }
                </>
                : null}
        </>
    )
}

export default MBTI;