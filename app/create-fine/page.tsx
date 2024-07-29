'use client'
import { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useCreateFine from '../core/domain/useCases/useCreateFine'
import useAppContext from '../context/context'
import type { User } from '../core/domain/entities/User'

import Button from '../components/Button/Button'

import styles from './createFine.module.sass'
import { FineStatus } from '../core/domain/entities/Fine'

type Inputs = {
  sender: number
  recipent: number
  ammountTokens: number
}

const CreateFine: FC = () => {
  const { mutate } = useCreateFine()

  const data = useAppContext()
  const [sender, setSender] = useState<User>({
    id: 0,
    nickname: 'Select a user',
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

  const onSubmit: SubmitHandler<Inputs> = fine => {
    const completeData = {
      // Cast to number sender and recipent to update correctly the context.
      sender: Number(fine.sender),
      recipent: Number(fine.recipent),
      ammountTokens: Number(fine.ammountTokens),
      // Fake this prop until login it's created.
      initiatorId: 0,
      // Complete this prop. It would be the backend which orchestrate this things.
      id: data.fines[data.fines.length - 1].id + 1,
      status: 'pending' as FineStatus
    }
    mutate(completeData)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.labelGroup}>
        <label className={styles.label}>
          Select user from whom you want to send tokens
        </label>

        <select
          className={styles.input}
          {...register('sender', { required: true })}
          onChange={selectSender}
          defaultValue='Select a user'
        >
          <option disabled>Select a user</option>
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
        {errors.recipent && (
          <span className={styles.error}>This field is required</span>
        )}
      </div>

      <div className={styles.labelGroup}>
        <label className={styles.label}>
          Select user you want to recive tokens
        </label>

        <select
          className={styles.input}
          {...register('recipent', { required: true })}
        >
          <option value='' disabled>
            Select a user
          </option>
          {recipents.map((user, index) => (
            <option key={user.id + index} value={user.id}>
              {user.nickname}
            </option>
          ))}
        </select>

        {errors.recipent && (
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
      <Button
        type='submit'
        text='Send'
        shape='button'
        color='primary'
        disabled={isSubmitting}
      />
    </form>
  )
}

export default CreateFine
