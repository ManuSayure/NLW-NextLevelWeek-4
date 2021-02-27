import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

const CompleteChallenges = () => {

    const {challengesCompleted } = useContext(ChallengesContext);

    return(
        <div className={styles.completeChanllengesContainer}>
            <span>Desafios Completos</span>
            <span>{ challengesCompleted }</span>

        </div>
    );
}; export default CompleteChallenges;
