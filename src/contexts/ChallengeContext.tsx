import { createContext, useState, useEffect, ReactNode } from 'react'
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
}

export const ChallengesContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [finishedChallenges, setFinishedChallenges] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function completeChallenge(experience: number) {
    setCurrentExperience(currentExperience + experience)
    setFinishedChallenges(finishedChallenges + 1)
    setActiveChallenge(null)
  }

  useEffect(() => {
    if (currentExperience > experienceToNextLevel) {
      setCurrentExperience(currentExperience - experienceToNextLevel)
      setLevel(level + 1)
    }
  }, [currentExperience])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
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
