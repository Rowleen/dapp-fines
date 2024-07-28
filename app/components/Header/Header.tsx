'use client'
import { FC } from 'react'
import Image from 'next/image'

import styles from './header.module.sass'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1>Dapp fines</h1>
    </header>
  )
}

export default Header