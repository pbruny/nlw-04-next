import Head from 'next/head'
import { GetServerSideProps } from 'next'

import ChallengeBox from '../components/ChallengeBox'

import CompletedChallenge from '../components/CompletedChallenges'
import Countdown from '../components/Countdown'
import ExperienceBar from '../components/ExperienceBar'
import Profile from '../components/Profile'

import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengeContext'

interface HomeProps {
  level: number
  currentExperience: number
  finishedChallenges: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      finishedChallenges={props.finishedChallenges}
    >
      <div className={styles.container}>
        <Head>
          <title>Se cuida aí</title>
        </Head>
        <ExperienceBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenge />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, finishedChallenges } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      finishedChallenges: Number(finishedChallenges),
    },
  }
}
