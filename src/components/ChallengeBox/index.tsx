import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengeContext'
import styles from '../../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
  const { activeChallenge, completeChallenge, resetChallenge } = useContext(
    ChallengesContext
  )

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>Ganhe {activeChallenge.amount} XP</header>

          <main>
            <img
              src={
                activeChallenge.type === 'body'
                  ? 'icons/body.svg'
                  : 'icons/eye.svg'
              }
              alt="Imagem de uma mão com uma anilha de pesos"
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              onClick={resetChallenge}
              type="button"
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              onClick={() => completeChallenge(activeChallenge.amount)}
              type="button"
              className={styles.challengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeBoxNotActive}>
          <strong>Complete um ciclo para receber desafios</strong>
          <p>
            <img
              src="icons/level-up.svg"
              alt="Imagem com uma seta para cima indicando Level up"
            />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  )
}
