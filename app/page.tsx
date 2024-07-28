'use client'
import { Header } from './components'

import styles from './sass/home.module.sass'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.home}>
        <Header />

        <section className={styles.titleWrapper}>
          <h1 className={styles.title}>The place to fine others</h1>

          <h2 className={styles.subtitle}>Let&apos;s live new adventures</h2>
        </section>
      </div>
    </div>
  )
}

export default Home
