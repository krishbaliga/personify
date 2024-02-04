import { useEffect, useRef } from "react";

function SensInt({songs, accessToken, setSensIntFinished, isLoading, mbti, topGenres}) {
    let sensingLevel = useRef();
    let intuitionLevel = useRef();

    useEffect(() => {
        analyzeSensing();
    },[])
    
    const fetchGenres = async () => {
        let genres = [];
        let total = 0;

        for(let i = 0; i < songs.length; i++) {
            let playlistGenres = [];
            let multiplesOf50 = Math.ceil(songs[i].songs.length/50);
            for(let j = 0; j < multiplesOf50; j++) {
                let idString = "";
                for(let k = j * 50; k < ((j+1) * 50) && k < songs[i].songs.length; k++) { // to get the id string
                    if(songs[i].songs[k].track && songs[i].songs[k].track.artists && songs[i].songs[k].track.artists[0].id)  {
                        if(k !== ((j+1) * 50) - 1) {
                            idString = idString + songs[i].songs[k].track.artists[0].id  + ","
                        } else {
                            idString = idString + songs[i].songs[k].track.artists[0].id
                        }
                    }
                }
                if(idString) {
                    const result = await fetch(`https://api.spotify.com/v1/artists?ids=${idString}`, {
                        method: "GET", headers: {Authorization: `Bearer ${accessToken}` }
                    })
                    const response = await result.json();
                    if(response) {
                        for(let l = 0; l < response.artists.length; l++) {
                            if(response.artists[l] !== null) {
                                for(let m = 0; m < response.artists[l].genres.length; m++) {
                                    if(containGenre(genres, response.artists[l].genres[m]) === false) {
                                        genres.push({
                                        name: response.artists[l].genres[m],
                                        counter: 1,
                                        recurrence: 0,
                                        src: response.artists[l].images[0],
                                        popularity: response.artists[l].popularity
                                        })
                                    } else {
                                        const genre = genres.find(genre => genre.name === response.artists[l].genres[m]);
                                        genre.counter++;
                                        if(response.artists[l].popularity >= genre.popularity) {
                                            genre.src = response.artists[l].images[1].url;
                                            genre.popularity = response.artists[l].popularity;
                                        }
                                    }
        
                                    if(containGenre(playlistGenres, response.artists[l].genres[m]) === false) { // for playlistGenres array
                                        playlistGenres.push({
                                        name: response.artists[l].genres[m],
                                        counter: 1,
                                        recurrence: 0
                                        })
                                    } else {
                                        const genre = playlistGenres.find(genre => genre.name === response.artists[l].genres[m]);
                                        genre.counter++;
                                    }
                                    total++;
                                }
                            }
                        }
                    }
                }
            }
            // for T/F
            for(let q = 0; q < playlistGenres.length; q++) {
                playlistGenres[q].recurrence = ((playlistGenres[q].counter) / (songs[i].songs.length));
            }
            if(playlistGenres.length > 1) {
                playlistGenres.sort((a, b) => b.recurrence - a.recurrence);
                
                let ratio = playlistGenres[0].recurrence + playlistGenres[1].recurrence;
                if(ratio > 1) {
                    ratio = 1;
                }
                songs[i].genreRatio = ratio;
            }
        }
        for(let i = 0; i < genres.length; i++) {
            genres[i].recurrence = genres[i].counter / total;
        }
        genres.sort((a, b) => b.recurrence - a.recurrence);
        return genres;
    }

    const containGenre = (genres, genreName) => {
        return genres.some(genre => genre.name === genreName);
    }
    
    const fetchPopularity = () => {
    let totalPopularity = 0;
    for(let i = 0; i < songs.length; i++) {
        for(let j = 0; j < songs[i].songs.length; j++) {
            if(songs[i].songs[j].track !== null){
                totalPopularity += songs[i].songs[j].track.popularity;
            }
        }
    }
    let totalLength = 0;
    for(let i = 0; i < songs.length; i++) {
        totalLength += songs[i].songs.length;
    } 

    let avgPopularity = totalPopularity/totalLength
    return avgPopularity;
    }

    const analyzeSensing = async () => {
    let genres = await fetchGenres(songs);
    let avgPopularity = fetchPopularity(songs);
    let topGenresRecurrence = 0;
    for(let i = 0; i < 3; i++) {
        topGenresRecurrence += genres[i].recurrence;
    }
    sensingLevel.current = (((avgPopularity/100) * .475) + ((topGenresRecurrence)/2) * .525);
    intuitionLevel.current = 1 - (((avgPopularity/100) * .475) + ((topGenresRecurrence)/2) * .525)

    const stringArray = mbti.current.split('');
    if(sensingLevel.current > intuitionLevel.current) {
        stringArray[1] = 'S';
    } else {
        stringArray[1] = 'N';
    }
    mbti.current = stringArray.join('');

    console.log("Sensing Level: " + sensingLevel.current);
    topGenres.current = genres.slice(0, 3);
    console.log(topGenres.current)
    setSensIntFinished(true);
    }
    
    return (
        <>
    
        </>
    )
}

export default SensInt;