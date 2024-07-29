import { useQuery } from '@tanstack/react-query'
import UserImplementation from '../../Infraestructure/services/User.implementation'

const userImpl = new UserImplementation()

const useGetUsers = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['getUsers'],
    queryFn: userImpl.get
  })

  return { users: data, isLoading }
}

export default useGetUsers
