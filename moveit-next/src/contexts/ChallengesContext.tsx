import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import LevelUpModal from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}


export function ChallengesProvider({ 
    children,
    ...rest } : ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrenteExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompeted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const [isLevelUpModalOpen, setIsLevelModalaOpen] = useState(false);

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
       setIsLevelModalaOpen(true);
    }
    function closeLevelUpModal(){
        setIsLevelModalaOpen(false);
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

                level,                 
                currentExperience, 
                activeChallenge,
                challengesCompleted,
                experienceToNextLevel,

                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,

            }}
        >

            { children }

           { isLevelUpModalOpen &&  <LevelUpModal/> }

        </ChallengesContext.Provider>
    )
    
}

