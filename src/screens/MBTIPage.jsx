import { useEffect, useState, useRef } from "react";

function MBTIPage({ accessToken, setAccessToken }) {
    const [loading, setLoading] = useState(false);
    const topSongs = useRef([]);
    const extravertLevel = useRef();
    const introvertLevel = useRef();

    useEffect(() => {
        fetchTopItems();
    }, [])

    const fetchTopItems = async () => {
        const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50", {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        })
        const response = await result.json();
        if (response !== null) {
            const topTracksResult = await fetch(`${response.href}`, {
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            })
            const topTracks = await topTracksResult.json();
            if (topTracks) {
                for (let i = 0; i < topTracks.items.length; i++) {
                    topSongs.current.push({
                        name: topTracks.items[i].name,
                        id: topTracks.items[i].id,
                        href: topTracks.items[i].href,
                        src: topTracks.items[i].album.images[1].url
                    }
                    )
                }
            }
        }
        analyzeExtravertedness();
    }

    const analyzeExtravertedness = async () => {
        let totalExtra = 0;
        let totalIntro = 0;
        for (let i = 0; i < topSongs.current.length; i++) { // for every playlist
            let lowVal = 0;
            let highVal = 0;
            let lowEng = 0;
            let highEng = 0;

            let idString = "";
            for (let i = 0; i < 50; i++) {
                if(topSongs.current[i] && topSongs.current[i].id) {
                    idString = idString + topSongs.current[i].id + ","
                }
            }
            const result = await fetch(`https://api.spotify.com/v1/audio-features?ids=${idString}`, {  // do batch calls i think u can do 100 at a time
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            })
            const response = await result.json();
            if (response !== null) {
                for (let k = 0; k < response.audio_features.length; k++) {
                    if (response.audio_features[k] && response.audio_features[k].energy && response.audio_features[k].valence) {
                        let avg = ((response.audio_features[k].energy + response.audio_features[k].valence) / 2);
                        if (avg >= .7) {
                            totalExtra++;
                        } else if (avg <= .4) {
                            totalIntro++;
                        }


                        if (response.audio_features[k].valence >= .7) {
                            highVal++;
                        } else if (response.audio_features[k].valence <= .4) {
                            lowVal++;
                        }
                        if (response.audio_features[k].energy >= .7) {
                            highEng++;
                        } else if (response.audio_features[k].energy <= .4) {
                            lowEng++;
                        }
                    }
                }
            }
            topSongs.current[i].valenceRatio = Math.max(highVal, lowVal) / topSongs.current.length;
            topSongs.current[i].energyRatio = highEng / topSongs.current.length;
        }

        extravertLevel.current = totalExtra / (totalExtra + totalIntro)  //extravertCounter/totalLength;
        introvertLevel.current = 1 - extravertLevel.current;

        console.log(extravertLevel.current);
    }

    return (
        <div class="page-container">
            homepage
        </div>
    )
}

export default MBTIPage;