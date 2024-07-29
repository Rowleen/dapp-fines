'use client'
import { FinesList } from './components'

const Home = () => {
  const authed = window.sessionStorage.getItem('authed')

  return authed && <FinesList />
}

export default Home
