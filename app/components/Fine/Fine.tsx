import { FC } from 'react'
import Image from 'next/image'
import useAppContext from '../../context/context'
import { Fine as FineType } from '../../core/domain/entities/Fine'
import Button from '../Button/Button'

import styles from './fine.module.sass'

interface FineProps {
  fine: FineType
}

const Fine: FC<FineProps> = ({ fine }) => {
  const data = useAppContext()

  const suggester =
    data && data.users.find(user => Number(user.id) === fine.initiatorId)
  const sender =
    data && data.users.find(user => Number(user.id) === fine.sender)
  const recipent =
    data && data.users.find(user => Number(user.id) === fine.recipent)

  return (
    <article className={styles.fine}>
      <div className={styles.column}>{sender?.nickname}</div>

      <div className={styles.column}>
        <small>Sends</small>
        <small className={styles.tokenText}>{fine.ammountTokens} tokens</small>
        <Image
          src={'images/arrow-right.svg'}
          width={20}
          height={20}
          alt='arrow-right'
        />
      </div>

      <div className={styles.column}>{recipent?.nickname}</div>

      <div className={styles.column}>
        <Button type='button' shape='link' text='Approve' /> |
        <Button type='button' shape='link' color='danger' text='Reject' />
      </div>
    </article>
  )
}

export default Fine
