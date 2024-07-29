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
        <div className={styles.linksWrapper}>
          <Link className={styles.link} href={'/'}>
            List of fines
          </Link>

          <Link className={styles.link} href={'/create-fine'}>
            Create Fine
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
