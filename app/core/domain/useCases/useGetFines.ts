import { useQuery } from '@tanstack/react-query'
import FineImplementation from '../../Infraestructure/services/Fine.implementation'

const fineImpl = new FineImplementation()

const useGetFines = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['getFines'],
    queryFn: fineImpl.get
  })

  return { fines: data, isLoading }
}

export default useGetFines
