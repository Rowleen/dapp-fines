'use client'
import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAppContext from '../context/context'

import Button from '../components/Button/Button'

import styles from './login.module.sass'

type Inputs = {
  username: string
  password: string
}

const Login: FC = () => {
  const context = useAppContext()
  const router = useRouter()

  const [toggleError, setToggleError] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>()

  const handleLogin = data => {
    const selectedUser = context.users.find(
      user => user.nickname === data.username
    )

    if (selectedUser) {
      window.sessionStorage.setItem('authed', JSON.stringify(true))
      window.sessionStorage.setItem('userId', JSON.stringify(selectedUser.id))
      router.push('/')
    } else {
      setToggleError(true)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = data => handleLogin(data)

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.labelGroup}>
        <label className={styles.label}>Username</label>

        <input
          className={styles.input}
          {...register('username', { required: true })}
        />

        {toggleError && (
          <span className={styles.error}>
            This username doesn&apos;t exists
          </span>
        )}
        {errors.username && (
          <span className={styles.error}>This field is required</span>
        )}
      </div>

      <div className={styles.labelGroup}>
        <label className={styles.label}>Password</label>

        <input
          type='password'
          className={styles.input}
          {...register('password', { required: true })}
        />

        {errors.password && (
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

export default Login
