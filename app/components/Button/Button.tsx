'use client'
import { FC } from 'react'
import classNames from 'classnames'

import styles from './button.module.sass'

interface ButtonProps {
  color?: 'primary' | 'danger'
  text: string
  onClick?: (event: React.MouseEvent) => void
  shape: 'pill' | 'button' | 'link'
  value?: string
  type: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  color,
  text,
  onClick,
  shape,
  value,
  type,
  disabled
}) => {
  const buttonClass = classNames({
    [styles.button]: shape === 'button',
    [styles.pill]: shape === 'pill',
    [styles.link]: shape === 'link',
    [styles.primary]: color === 'primary',
    [styles.linkDanger]: color === 'danger'
  })

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
      value={value}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
