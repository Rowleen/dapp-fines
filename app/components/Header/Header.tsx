'use client'
import { FC } from 'react'
import Link from 'next/link'

import styles from './header.module.sass'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1>Dapp fines</h1>

      <Link href={'/'}>List of fines</Link>
      <Link href={'/create-fine'}>Create Fine</Link>
    </header>
  )
}

export default Header
