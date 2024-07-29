'use client'
import { useContext, createContext, useState, useEffect, Context } from 'react'
import { User } from '../core/domain/entities/User'
import { Fine } from '../core/domain/entities/Fine'
import useGetUsers from '../core/domain/useCases/useGetUsers'
import useGetFines from '../core/domain/useCases/useGetFines'

interface ContextAppInterface {
  users: User[]
  fines: Fine[]
}

export const AppContext = createContext({
  users: [],
  fines: []
} as ContextAppInterface)

export const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [context, setContext] = useState<ContextAppInterface>({
    users: [],
    fines: []
  })

  const { users } = useGetUsers()
  const { fines } = useGetFines()

  useEffect(() => {
    if (users && fines) {
      setContext({
        ...context,
        users,
        fines
      })
    }
  }, [users, fines])

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    console.error('Error deploying App Context')
  }

  return context
}

export default useAppContext
