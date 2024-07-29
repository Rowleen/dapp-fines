import { FC } from 'react'

import styles from './avatar.module.sass'

interface AvatarInterface {
  name: string
}

const Avatar: FC<AvatarInterface> = ({ name }) => {
  const getInitials = name.slice(0, 2)

  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}>{getInitials}</div>
      <span>{name}</span>
    </div>
  )
}

export default Avatar
