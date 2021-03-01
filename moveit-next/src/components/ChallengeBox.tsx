import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';


function ChallengeBox(){

    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }

    function handleChalledeFailed(){
        resetChallenge();
        resetCountdown();
    }


    return(
       
            <div className={styles.container}>
            {
                activeChallenge ? (
                    <div  >

                        <header> Ganhe {activeChallenge.amount}xp </header>

                        <main>

                            <img src={`icons/${activeChallenge.type}.svg`} alt=" body"/>

                            <strong> Novo desafio </strong>
                            
                            <p> { activeChallenge.description } </p>

                            
                        </main>

                        <footer>
                            <button 
                            type='button'
                          
                            onClick={ handleChalledeFailed }
                            >
                                Falhei
                            </button>

                            <button 
                             type='button'
                            
                             onClick={ handleChallengeSucceeded }
                             >
                                Completei
                            </button>
                        </footer>

                    </div>

                ) : (
                        <div className={ styles.challengerNotActive} >
                            <strong> Finalize um ciclo para receber um desafio </strong>
                            <p>
                                <img src="icons/level-up.svg" alt="Level Up"/>
                                Avance de level completando desafios.
                            </p>
                        </div>

                )
            }           

        </div>

       
        
    )

}; export default ChallengeBox;