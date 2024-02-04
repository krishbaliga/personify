import { useRef, useEffect } from "react";
import logo from '../../assets/logo.png';

function Result({isLoading, mbti, topGenres, songsToDisplay, setIsLoading, accessToken}) {
    const artistsToDisplay = useRef([]);
    const descriptions = [
        {name: "ISTJ", description: "ISTJ individuals are quiet, serious, and achieve success through thorough and dependable efforts. They are practical, realistic, and responsible decision-makers who focus on logical solutions, working steadily towards their goals despite distractions. These individuals take pleasure in maintaining order and organization in all aspects of their life, valuing traditions and loyalty."},
        {name: "ISFJ", description: "ISFJ individuals are characterized by their quiet, friendly nature, responsibility, and conscientious approach. Committed and steady in meeting obligations, they are thorough, accurate, and considerate. Loyal and concerned about others' feelings, ISFJs strive to create a harmonious environment both at work and at home."},
        {name: "INFJ", description: "INFJ individuals seek meaning and connection in ideas, relationships, and possessions. They possess a deep understanding of human motivation and are committed to firm values. INFJs develop a clear vision to serve the common good, and they are organized and decisive in implementing their vision."},
        {name: "INTJ", description: "INTJ individuals have original minds and a strong drive to implement their ideas and achieve goals. They quickly discern patterns in external events, develop long-range perspectives, and, when committed, organize and execute tasks efficiently. Skeptical and independent, they hold high standards of competence for themselves and others."},
        {name: "ISTP", description: "ISTP individuals are tolerant, flexible, and quiet observers who act quickly to find workable solutions when a problem arises. They analyze the workings of things, efficiently process large amounts of data to identify practical problems, and value efficiency. Interested in cause and effect, ISTPs organize facts using logical principles."},
        {name: "ISFP", description: "ISFP individuals are quiet, friendly, sensitive, and kind. They enjoy the present moment, value their own space and time frame, and are loyal to their values and important people. ISFPs dislike conflicts, preferring not to force their opinions or values on others."},
        {name: "INFP", description: "INFP individuals are idealistic and loyal to their values and significant others. They seek a life congruent with their values, are quick to see possibilities, and can be catalysts for implementing ideas. Adaptable and flexible, they strive to understand and help others fulfill their potential."},
        {name: "INTP", description: "INTP individuals aim to develop logical explanations for everything that interests them. Theoretical and abstract, they are more interested in ideas than social interaction. Quiet, contained, flexible, and adaptable, INTPs focus in-depth to solve problems in their area of interest, demonstrating skepticism, critical thinking, and analytical skills."},
        {name: "ESTP", description: "ESTP individuals are flexible and tolerant, taking a pragmatic approach focused on immediate results. They are bored by theories and explanations, preferring energetic action to solve problems. ESTPs live in the present, enjoy spontaneity, and find pleasure in active moments with others. They appreciate material comforts and style, learning best through hands-on experience."},
        {name: "ESFP", description: "ESFP individuals are outgoing, friendly, and accepting. They are exuberant lovers of life, people, and material comforts. ESFPs work well with others to make things happen, bringing a realistic and common-sense approach to their endeavors. They are flexible, spontaneous, and adaptable, learning best through trying new skills with others."},
        {name: "ENFP", description: "ENFP individuals are warmly enthusiastic and imaginative, viewing life as full of possibilities. They quickly make connections between events and information, proceeding confidently based on observed patterns. ENFPs seek affirmation from others and readily provide appreciation and support. Spontaneous and flexible, they rely on improvisation and verbal fluency."},
        {name: "ENTP", description: "ENTP individuals are quick, ingenious, stimulating, alert, and outspoken. They excel in solving new and challenging problems, generating conceptual possibilities and strategically analyzing them. ENTPs are adept at reading others, easily bored by routine, and often explore new interests one after another."},
        {name: "ESTJ", description: "ESTJ individuals are practical, realistic, and decisive. They quickly implement decisions, organize projects and people efficiently to achieve results. They focus on getting things done in the most efficient way possible, taking care of routine details. ESTJs have clear logical standards that they follow systematically, expecting others to do the same, and are forceful in implementing their plans."},
        {name: "ESFJ", description: "ESFJ individuals are warmhearted, conscientious, and cooperative. They desire harmony in their environment, working determinedly to establish it. ESFJs enjoy collaborating with others to complete tasks accurately and on time. Loyal and attentive to details, they notice and provide for the needs of others in their day-to-day lives, seeking appreciation for their contributions."},
        {name: "ENFJ", description: "ENFJ individuals are warm, empathetic, responsive, and responsible. They are highly attuned to the emotions, needs, and motivations of others, finding potential in everyone. ENFJs act as catalysts for individual and group growth, responding to praise and criticism. Sociable and inspiring leaders, they facilitate group dynamics and share knowledge."},
        {name: "ENTJ", description: "ENTJ individuals are frank, decisive, and assume leadership readily. They quickly identify illogical and inefficient procedures, developing comprehensive systems to solve organizational problems. ENFJs enjoy long-term planning and goal setting, staying well-informed and sharing knowledge with others. They are forceful in presenting their ideas."}
    ];
    const personality = descriptions.find(description => description.name === mbti.current);
    const stringArray = mbti.current.split('');

    useEffect(() => {
        getArtistsToDisplay();
    }, [])

    const getArtistsToDisplay = async () => {
        const result = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=3`, { 
            method: "GET", headers: {Authorization: `Bearer ${accessToken}`}
        })
        const response = await result.json();
        if(response) {
            console.log(response)
            for(let i = 0; i < response.items.length; i++) {
                artistsToDisplay.current.push({
                    name: response.items[i].name,
                    src: response.items[i].images[0].url
                })
            }
        }
        setIsLoading(false);
    }

    return (
        <>
        {!isLoading ?
            <div className="mbti-container" id="results-container" style={{backgroundColor: "#EF9595"}}>
                <h1 className="header">You are an {mbti.current}</h1>
                <p className="sub-text">{personality.description}</p>
                <div className="info-container">
                    <div className="top-songs-container">
                        {stringArray[0] === 'E' ?
                            <h1 className="sub-header">Your Top Extraverted Songs</h1>
                        : 
                            <h1 className="sub-header">Your Top Introverted Songs</h1>
                        }
                        <div className="top-items" id="results-top-items">
                            {songsToDisplay.current.slice(0, 3).map((song) => {
                                return(
                                    <div className="song-container" id="results-item">
                                        <img className="song-img" src={song.src}></img>
                                        <p className="song-name" id="results-name">{song.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    
                    <div className="top-songs-container">
                        <h1 className="sub-header">Your Top Genres</h1>
                        <div className="top-items" id='results-top-items'>
                            {topGenres.current.map(genre => {
                                return (
                                    <div className="genre-container" id="results-item">
                                        <img className="song-img" src={genre.src}></img>
                                        <p className="song-name" id="results-name">{genre.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="top-songs-container">
                        <h1 className="sub-header">Your Current Top Artists</h1>
                        <div className="top-items" id='results-top-items'>
                            {artistsToDisplay.current.map(artist => {
                                return (
                                    <div className="genre-container" id="results-item">
                                        <img className="song-img" src={artist.src}></img>
                                        <p className="song-name" id="results-name">{artist.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="credits-container">
                    <img className="credit-logo" src={logo}></img>
                    <p className="sub-text">MBTIfy</p>
                </div>
            </div>
        : null
        }
        </>
    )
}

export default Result