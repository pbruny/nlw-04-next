import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'

import styles from '../../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenge() {
  const { finishedChallenges } = useContext(ChallengesContext)

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{finishedChallenges}</span>
    </div>
  )
}
