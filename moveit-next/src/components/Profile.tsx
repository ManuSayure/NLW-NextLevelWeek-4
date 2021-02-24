
import * as React from 'react';
import styles from '../styles/components/Profile.module.css';

const Profile = () => {
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/20269170?s=400&u=840470c5d5f19846eac0b13261cf0556e1d53c04&v=4" alt="Manoela Cassia"/>
            <div>
                <strong>Manoela Cassia </strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1</p>
            </div>
        </div>
    );
}; export default Profile;