import { useMutation } from '@tanstack/react-query'
import FineImplementation from '../../Infraestructure/services/Fine.implementation'
import type { Fine } from '../entities/Fine'
import useAppContext from '../../../context/context'
import { toast } from 'react-toastify'

const fineImp = new FineImplementation()

const useCreateFine = () => {
  const context = useAppContext()

  const addFineToContext = (fine: Fine) => {
    const { fines, setData } = context

    setData({
      ...context,
      fines: [...fines, fine]
    })
  }

  return useMutation({
    mutationFn: (fine: Fine) => fineImp.post(fine),
    onSuccess: fine => {
      addFineToContext(fine)

      toast.success('The fine was succefully created.')
    },
    onError: () =>
      toast.error('Ops, something went wrong. Please try again later.')
  })
}

export default useCreateFine
