'use client'
import { Header, FinesList } from './components'

import styles from './sass/home.module.sass'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.home}>
        <Header />

        <section className={styles.titleWrapper}>
          <h1 className={styles.title}>The place to fine others</h1>

          <h2 className={styles.subtitle}>Let&apos;s do new friends</h2>
        </section>

        <FinesList />
      </div>
    </div>
  )
}

export default Home
