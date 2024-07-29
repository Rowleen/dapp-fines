'use client'
import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAppContext from '../context/context'
import type { User } from '../core/domain/entities/User'

import Button from '../components/Button/Button'

import styles from './createFine.module.sass'

type Inputs = {
  senderId: number
  recipentId: number
  ammountTokens: number
}

const CreateFine: FC = () => {
  const data = useAppContext()
  const [sender, setSender] = useState<User>({
    id: 0,
    nickname: 'Doe',
    tokens: 0
  })

  const [recipents, setRecipents] = useState<User[]>([])

  useEffect(() => {
    if (sender) {
      const recipents = data.users.filter(user => sender.id !== user.id)
      setRecipents(recipents)
    }
  }, [sender])

  const selectSender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const sender = data.users.find(user => user.id === Number(value))

    if (sender) {
      setSender(sender)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.labelGroup}>
        <label className={styles.label}>
          Select user from whom you want to send tokens
        </label>

        <select
          className={styles.input}
          {...register('senderId', { required: true })}
          onChange={selectSender}
        >
          <option value='' disabled selected>
            Select a user
          </option>
          {data.users.map((user, index) => (
            <option
              key={user.id + index}
              value={user.id}
              disabled={user.tokens === 0}
            >
              {user.nickname} - Total tokens: {user.tokens}
            </option>
          ))}
        </select>

        {errors.recipentId && (
          <span className={styles.error}>This field is required</span>
        )}
      </div>

      <div className={styles.labelGroup}>
        <label className={styles.label}>
          Select user you want to recive tokens
        </label>

        <select
          className={styles.input}
          {...register('recipentId', { required: true })}
        >
          <option value='' disabled selected>
            Select a user
          </option>
          {recipents.map((user, index) => (
            <option key={user.id + index} value={user.id}>
              {user.nickname}
            </option>
          ))}
        </select>

        {errors.recipentId && (
          <span className={styles.error}>This field is required</span>
        )}
      </div>

      <div className={styles.labelGroup}>
        <label className={styles.label}>
          Write the ammount of tokens to send
        </label>

        <input
          className={styles.input}
          {...register('ammountTokens', {
            required: `This field is required and must be between 1 and ${sender.tokens}`,
            min: 1,
            max: sender.tokens
          })}
          type='number'
          placeholder={`Don't exced the maximun of tokens (${sender.tokens}) for ${sender.nickname}`}
        />

        {errors.ammountTokens && (
          <span className={styles.error}>This field is required</span>
        )}
      </div>
      <Button type='submit' text='Send' shape='button' color='primary' />
    </form>
  )
}

export default CreateFine
