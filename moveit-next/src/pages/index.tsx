import Head from 'next/head'
import CompleteChallenges from '../components/CompletedChallenges';
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (    
    <div className={styles.container}>
       <ExperienceBar/>
      <section>
        <div>
          <Profile/>
          <CompleteChallenges/>
        </div>

        <div>

        </div>
      </section>
      
     
    </div>
  )
}