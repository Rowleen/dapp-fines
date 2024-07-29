'use client'
import { FC } from 'react'
import Link from 'next/link'

import styles from './header.module.sass'

const Header: FC = () => {
  const authed =
    typeof window !== 'undefined' && window.sessionStorage.getItem('authed')

  return (
    <header className={styles.header}>
      <h1>Dapp fines</h1>

      {authed && (
        <>
          <Link href={'/'}>List of fines</Link>
          <Link href={'/create-fine'}>Create Fine</Link>
        </>
      )}
    </header>
  )
}

export default Header
