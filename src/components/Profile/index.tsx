import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'

import styles from '../../styles/components/Profile.module.css'

export default function Profile() {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/pbruny.png" alt="Imagem de Paulo Bruny" />
      <div>
        <strong>Paulo Bruny Lima</strong>
        <p>
          <img src="icons/level.svg" alt="Seta verde para cima" />
          Level {level}
        </p>
      </div>
    </div>
  )
}
