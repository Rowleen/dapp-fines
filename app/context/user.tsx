'use client'
import React, { useContext, createContext, useState, useEffect } from 'react'

export const UserContext = createContext({
  authed: false,
  userId: 0
})

export const UserContextProvider = ({
  children
}: {
  children: JSX.Element
}) => {
  const [userInfo, setUserInfo] = useState({
    authed: false,
    userId: 0
  })

  useEffect(() => {
    const authed =
      typeof window !== 'undefined' &&
      Boolean(window.sessionStorage.getItem('authed'))
    const userId =
      typeof window !== 'undefined' &&
      Number(window.sessionStorage.getItem('userId'))

    if (authed && userId) {
      setUserInfo({ authed, userId })
    }
  }, [])

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    console.error('Error deploying App Context')
  }

  return context
}

export default useUserContext
