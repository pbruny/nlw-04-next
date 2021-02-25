import styles from '../../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
  const hasActiveChallenge = true

  return (
    <div className={styles.challengeBoxContainer}>
      {hasActiveChallenge ? (
        <div className={styles.challengeBoxActive}>
          <header>Ganhe 400 XP</header>

          <main>
            <img
              src="icons/body.svg"
              alt="Imagem de uma mão com uma anilha de pesos"
            />
            <strong>Novo desafio</strong>
            <p>Faça um alongamento de 1 minuto após levantar-se</p>
          </main>

          <footer>
            <button type="button" className={styles.challengeFailedButton}>
              Falhei
            </button>
            <button type="button" className={styles.challengeSucceededButton}>
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
