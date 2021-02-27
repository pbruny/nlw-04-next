import { createContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'

interface ChallengeData {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengeContextData {
  level: number
  currentExperience: number
  finishedChallenges: number
  experienceToNextLevel: number
  activeChallenge: ChallengeData
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: (experience: number) => void
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  finishedChallenges: number
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  )
  const [finishedChallenges, setFinishedChallenges] = useState(
    rest.finishedChallenges ?? 0
  )
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function completeChallenge(experience: number) {
    if (!activeChallenge) {
      return
    }
    setCurrentExperience(currentExperience + experience)
    setFinishedChallenges(finishedChallenges + 1)
    setActiveChallenge(null)
  }

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('finishedChallenges', String(finishedChallenges))
  }, [level, currentExperience, finishedChallenges])

  useEffect(() => {
    if (currentExperience >= experienceToNextLevel) {
      setCurrentExperience(currentExperience - experienceToNextLevel)
      levelUp()
    }
  }, [currentExperience])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`,
      })
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Novo desafio', {
            body: `Valendo ${challenge.amount}xp!`,
          })
        }
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        finishedChallenges,
        activeChallenge,
        experienceToNextLevel,
        startNewChallenge,
        completeChallenge,
        resetChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
