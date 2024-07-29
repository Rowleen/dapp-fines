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

  const updateFineContext = (fine: Fine) => {
    const { fines, users, setData } = context

    const updatedFinesArray = fines.map(oldFine =>
      fine.id === oldFine.id ? fine : oldFine
    )

    const sender = users.find(user => user.id === fine.sender)
    const recipent = users.find(user => user.id === fine.recipent)

    if (sender && recipent) {
      const newSender = {
        ...sender,
        tokens: sender?.tokens + fine.ammountTokens
      }

      const newRecipent = {
        ...recipent,
        tokens: recipent?.tokens - fine.ammountTokens
      }

      const updateUserListWithSender = users.map(user =>
        user.id === newSender.id ? newSender : user
      )

      const updateUserList = updateUserListWithSender.map(user =>
        user.id === newRecipent.id ? newRecipent : user
      )

      setData({
        ...context,
        users: [...updateUserList],
        fines: updatedFinesArray
      })
    }
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
