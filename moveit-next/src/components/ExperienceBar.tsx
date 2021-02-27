import * as React from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';



export default function ExperienceBar(){
    const {currentExperience, experienceToNextLevel} = React.useContext(ChallengesContext);
    const percentualToNextLevel = Math.round((currentExperience *100) / experienceToNextLevel);
    return(
        <div className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentualToNextLevel}%`}}/>   
                <span className={styles.currentExperience} style={{left:'50%'}}>{currentExperience} xp</span>             
            </div>
            <span>{experienceToNextLevel} xp</span>
        </div>
    )

}