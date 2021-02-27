import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

export const ChallengesContext = createContext({} as ChallengesContextData);

interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;    
    currentExperience: number
    challengesCompleted:number;  
    activeChallenge: Challenge; 
    experienceToNextLevel: number;

    levelUp: () => void ;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export function ChallengesProvider({ children } : ChallengesProviderProps){

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrenteExperience] = useState(0);
    const [challengesCompleted, setChallengesCompeted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1 ) * 4 , 2)

    useEffect( () => {
        Notification.requestPermission();
    }, [])

    useEffect( () => {
        Cookies.set('level', level.toString());
        Cookies.set('currentExperience', currentExperience.toString());
        Cookies.set('challengesCompleted', challengesCompleted.toString());

    }
    , [ level, currentExperience, challengesCompleted  ])


    function levelUp(){
       setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor( Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play;

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }

    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        console.log(activeChallenge);

        setCurrenteExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompeted(challengesCompleted + 1);
        console.log(activeChallenge);

    }

    return(
        <ChallengesContext.Provider 
            value={{

                level:1,                 
                currentExperience, 
                activeChallenge,
                challengesCompleted,
                experienceToNextLevel,

                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge,

            }}
        >

            { children }

        </ChallengesContext.Provider>
    )
    
}

