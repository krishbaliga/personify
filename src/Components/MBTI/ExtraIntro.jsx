import {useEffect, useRef} from "react";
import Song from "../Song";
function ExtraIntro({songs, accessToken, setExtraIntroFinished, isLoading, topSongs, mbti, songsToDisplay}) {
    let extravertLevel = useRef();
    let introvertLevel = useRef();

    useEffect(() => {
        analyzeExtravertedness();
    },[])

    const analyzeExtravertedness = async () => {
        let totalExtra = 0;
        let totalIntro = 0;
        for(let i = 0; i < songs.length; i++) { // for every playlist
            let lowVal = 0;
            let highVal = 0;
            let lowEng = 0;
            let highEng = 0;
            let multiplesOf100 = Math.ceil(songs[i].songs.length/100);

            for(let m = 0; m < multiplesOf100; m++) {

                let idString = "";
                for(let j = m * 100; j < (m+1) * 100 && j < songs[i].songs.length; j++) {
                    if(songs[i].songs[j].track !== null && songs[i].songs[j].track.id) {
                        idString = idString + songs[i].songs[j].track.id  + ","
                    }
                }
                const result = await fetch(`https://api.spotify.com/v1/audio-features?ids=${idString}`, {  // do batch calls i think u can do 100 at a time
                    method: "GET", headers: {Authorization: `Bearer ${accessToken}`}
                })
                const response = await result.json();
                if(response !== null) {
                    for(let k = 0; k < response.audio_features.length; k++) {
                        if(response.audio_features[k] !== null && response.audio_features[k].energy !== null && response.audio_features[k].valence !== null) {
                            let avg = ((response.audio_features[k].energy + response.audio_features[k].valence)/2);
                            /*if(avg >= .55) {
                                extravertCounter++;
                            }*/
                            if(avg >= .7) {
                                totalExtra++;
                            } else if (avg <= .4) {
                                totalIntro++;
                            }


                            if(response.audio_features[k].valence >= .7) {
                                highVal++;
                            } else if(response.audio_features[k].valence <= .4) {
                                lowVal++;
                            }
                            if(response.audio_features[k].energy >= .7) {
                                highEng++;
                            } else if(response.audio_features[k].energy <= .4) {
                                lowEng++;
                            }
                        }
                    }
                }
            }
            songs[i].valenceRatio = Math.max(highVal, lowVal)/songs[i].songs.length;
            songs[i].energyRatio = highEng/songs[i].songs.length;
        }

        let totalLength = 0;
        for(let i = 0; i < songs.length; i++) {
            totalLength += songs[i].songs.length;
        } 
        extravertLevel.current = totalExtra/(totalExtra + totalIntro)  //extravertCounter/totalLength;
        introvertLevel.current = 1-extravertLevel.current;

        const stringArray = mbti.current.split('');
        if(extravertLevel.current > introvertLevel.current) {
            stringArray[0] = 'E';
        } else {
            stringArray[0] = 'I';
        }
        mbti.current = stringArray.join('');
        console.log(extravertLevel.current);


        getSongsToDisplay();
    }

    const getSongsToDisplay = async () => {
        let idString = "";
        let songsArray = [];
        for(let i = 0; i < topSongs.current.length; i++) {
            if(topSongs.current[i].id) {
                idString = idString + topSongs.current[i].id  + ",";
            }
        }
        const result = await fetch(`https://api.spotify.com/v1/audio-features?ids=${idString}`, { 
            method: "GET", headers: {Authorization: `Bearer ${accessToken}`}
        })
        const response = await result.json();
        for(let i = 0; i < response.audio_features.length; i++) {
                if(extravertLevel.current > introvertLevel.current) {
                    if(((response.audio_features[i].valence + response.audio_features[i].energy) / 2) > .6) {
                        const song = topSongs.current.find(song => song.id === response.audio_features[i].id);
                        song.avg = (response.audio_features[i].valence + response.audio_features[i].energy) / 2;//
                        songsArray.push(song)
                    }
                }else if(introvertLevel.current > extravertLevel.current) {
                    if(((response.audio_features[i].valence + response.audio_features[i].energy) / 2) < .5) {
                        const song = topSongs.current.find(song => song.id === response.audio_features[i].id);
                        song.avg = (response.audio_features[i].valence + response.audio_features[i].energy) / 2;//
                        songsArray.push(song)
                    }
                }
            //}
        }
        if(extravertLevel.current > introvertLevel.current) {
            songsArray.sort((a, b) => b.avg - a.avg);
        } else if(extravertLevel.current < introvertLevel.current) {
            songsArray.sort((a, b) => a.avg - b.avg);
        }
        songsToDisplay.current = songsArray;
        console.log(songsToDisplay.current)
        setExtraIntroFinished(true);
    }
    
    return (
        <>
        
        </>
    )
}

export default ExtraIntro;