import styles from '../../styles/components/Profile.module.css'

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/pbruny.png" alt="Imagem de Paulo Bruny" />
      <div>
        <strong>Paulo Bruny Lima</strong>
        <p>
          <img src="icons/level.svg" alt="Seta verde para cima" />
          Level 1
        </p>
      </div>
    </div>
  )
}
