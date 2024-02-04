import { useEffect, useRef } from "react";

function ThinkFeel({songs, isLoading, setIsLoading, mbti}) {
    let thinkingLevel = useRef();
    let feelingLevel = useRef();

    useEffect(() => {
        analyzeThinking();
    }, [])

    const analyzeThinking = () => {
        let thinkingCounter = 0;
        let feelingCounter = 0;

        for(let i = 0; i < songs.length; i++) {
            if(songs[i].valenceRatio >= .6) {
                feelingCounter++;
            }
            if(songs[i].genreRatio >= .6) {
                thinkingCounter++;
            }
        }
        
        thinkingLevel.current = thinkingCounter/(thinkingCounter + feelingCounter);
        feelingLevel.current = feelingCounter/(thinkingCounter + feelingCounter);
        const stringArray = mbti.current.split('');
        if(thinkingLevel.current > feelingLevel.current) {
            stringArray[2] = 'T';
        } else {
            stringArray[2] = 'F';
        }
        mbti.current = stringArray.join('');
    }
    return (
        <>
        
        </>
    )
}

export default ThinkFeel;