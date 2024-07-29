'use client'
import { FC } from 'react'
import Link from 'next/link'
import useUserContext from '../../context/user'

import styles from './header.module.sass'

const Header: FC = () => {
  const { authed } = useUserContext()

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
