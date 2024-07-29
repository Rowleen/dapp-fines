import React, { FC, useCallback } from 'react'
import useAppContext from '../../context/context'
import Image from 'next/image'
import classNames from 'classnames'
import Button from '../Button/Button'
import Avatar from '../Avatar/Avatar'

import type { Fine as FineType } from '../../core/domain/entities/Fine'

import styles from './fine.module.sass'
import useUpdateStatusFine from '../../core/domain/useCases/useUpdateFine'

interface FineProps {
  fine: FineType
}

const Fine: FC<FineProps> = ({ fine }) => {
  const data = useAppContext()

  const { mutate } = useUpdateStatusFine()

  const sender =
    data && data.users.find(user => Number(user.id) === fine.sender)
  const recipent =
    data && data.users.find(user => Number(user.id) === fine.recipent)

  const status = classNames({
    [styles.statusSuccess]: fine.status === 'approved',
    [styles.statusDanger]: fine.status === 'rejected'
  })

  return (
    <article className={styles.fine}>
      <div className={styles.column}>
        <Avatar name={sender?.nickname || 'Doe'} />
      </div>

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

      <div className={styles.column}>
        <Avatar name={recipent?.nickname || 'Doe'} />
      </div>

      {fine.status === 'pending' ? (
        <div className={styles.column}>
          <Button
            type='button'
            shape='link'
            text='Approve'
            value='approved'
            onClick={() => mutate({ fine, status: 'approved' })}
          />
          |
          <Button
            type='button'
            shape='link'
            color='danger'
            text='Reject'
            value='rejected'
            onClick={() => mutate({ fine, status: 'rejected' })}
          />
        </div>
      ) : (
        <div className={styles.column}>
          <span className={status}>{fine.status}</span>
        </div>
      )}
    </article>
  )
}

export default Fine
