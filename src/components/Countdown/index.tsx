import { useState, useEffect } from 'react'
import styles from '../../styles/components/Countdown.module.css'

export default function Countdown() {
  const [time, setTime] = useState(2 * 60)
  const [isActive, setIsActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  useEffect(() => {
    if (isActive && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  }, [isActive, time])

  function startCountdown() {
    setIsActive(!isActive)
  }

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {isActive ? (
        <button
          type="button"
          className={styles.countdownButton + ' ' + styles.countdownCloseButton}
          onClick={startCountdown}
        >
          Abandonar Ciclo{' '}
          <img src="icons/close.svg" alt="Símbolo de um x para fechar" />
        </button>
      ) : (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>
      )}
    </div>
  )
}
