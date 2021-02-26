import { useContext, useState } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'

import styles from '../../styles/components/ExperienceBar.module.css'

export default function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  )

  const [isHovering, setIsHovering] = useState(false)

  function handleHoverElement() {
    setIsHovering(!isHovering)
  }

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div onMouseEnter={handleHoverElement} onMouseLeave={handleHoverElement}>
        <div style={{ width: `${percentToNextLevel}% ` }} />
        {isHovering ? (
          <span
            className={styles.currentExperience}
            style={{ left: `${percentToNextLevel}% ` }}
          >
            {currentExperience} xp
          </span>
        ) : null}
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}
