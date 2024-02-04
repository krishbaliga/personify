import { useEffect, useRef } from "react";

function JudgePercep({songs, isLoading, setIsLoading, mbti}) {
    let judgingLevel = useRef();
    let perceptionLevel = useRef();

    useEffect(() => {
        analyzeJudging();
    }, [])

    const analyzeJudging = () => {
        let judgingCounter = 0;
        for(let i = 0; i < songs.length; i++) {
            if(songs[i].valenceRatio >= .7 || songs[i].energyRatio >= .7 || songs[i].genreRatio >= .7) {
                judgingCounter++;
            }
        }
        judgingLevel.current = judgingCounter/songs.length;
        perceptionLevel.current = 1 - (judgingCounter/songs.length);
        console.log("Judging LeveL: " + judgingLevel.current);

        const stringArray = mbti.current.split('');
        if(judgingLevel.current > perceptionLevel.current) {
            stringArray[3] = 'J';
        } else {
            stringArray[3] = 'P';
        }
        mbti.current = stringArray.join('');
    }
    return (
        <>
        
        </>
    )
}
export default JudgePercep;