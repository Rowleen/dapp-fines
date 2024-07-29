'use client'
import { FinesList } from './components'
import useUserContext from './context/user'

const Home = () => {
  const { authed } = useUserContext()

  return authed && <FinesList />
}

export default Home
