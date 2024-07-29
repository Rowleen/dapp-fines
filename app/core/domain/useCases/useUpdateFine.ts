import { useMutation } from '@tanstack/react-query'
import useAppContext from '../../../context/context'
import FineImplementation from '../../Infraestructure/services/Fine.implementation'
import type { Fine, FineStatus } from '../entities/Fine'

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
    onSuccess: fine => updateFineContext(fine)
  })
}

export default useUpdateStatusFine
