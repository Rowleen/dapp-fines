import { useMutation } from '@tanstack/react-query'
import useAppContext from '../../../context/context'
import FineImplementation from '../../Infraestructure/services/Fine.implementation'
import type { Fine, FineStatus } from '../entities/Fine'
import { toast } from 'react-toastify'

const fineImpl = new FineImplementation()

interface mutationFnInterface {
  fine: Fine
  status: FineStatus
}

const useUpdateStatusFine = () => {
  const context = useAppContext()

  const updateFineContext = (updatedFine: Fine) => {
    const { fines, setData } = context

    const updatedFinesArray = fines.map(oldFine =>
      updatedFine.id === oldFine.id ? updatedFine : oldFine
    )

    setData({ ...context, fines: updatedFinesArray })
  }
  return useMutation({
    mutationFn: ({ fine, status }: mutationFnInterface) => {
      return fineImpl.patch(fine.id, status)
    },
    onSuccess: fine => {
      updateFineContext(fine)
      toast.success('The fine was succefully updated')
    },
    onError: () =>
      toast.error('Ops, something went wrong updating. Please try again later.')
  })
}

export default useUpdateStatusFine
