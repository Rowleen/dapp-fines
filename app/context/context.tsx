'use client'
import { useContext, createContext, useState, useEffect } from 'react'
import { User } from '../core/domain/entities/User'
import { Fine } from '../core/domain/entities/Fine'
import useGetUsers from '../core/domain/useCases/useGetUsers'
import useGetFines from '../core/domain/useCases/useGetFines'

interface StateAppInterface {
  users: User[]
  fines: Fine[]
}

interface ContextAppInterface extends StateAppInterface {
  setData: (data: StateAppInterface) => void
}

export const AppContext = createContext({
  users: [],
  fines: [],
  setData: () => {}
} as ContextAppInterface)

export const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<StateAppInterface>({
    users: [],
    fines: []
  })

  const { users } = useGetUsers()
  const { fines } = useGetFines()

  useEffect(() => {
    if (users && fines) {
      setData({
        users,
        fines
      })
    }
  }, [users, fines])

  return (
    <AppContext.Provider value={{ ...data, setData } as ContextAppInterface}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    console.error('Error deploying App Context')
  }

  return context
}

export default useAppContext
