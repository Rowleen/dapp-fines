import { useMutation } from '@tanstack/react-query'
import FineImplementation from '../../Infraestructure/services/Fine.implementation'
import type { Fine } from '../entities/Fine'
import useAppContext from '../../../context/context'
import { toast } from 'react-toastify'

const fineImp = new FineImplementation()

const useCreateFine = () => {
  const context = useAppContext()

  const addFineToContext = (fine: Fine) => {
    const { fines, users, setData } = context

    const sender = users.find(user => user.id === fine.sender)
    const recipent = users.find(user => user.id === fine.recipent)

    if (sender && recipent) {
      const newSender = {
        ...sender,
        tokens: sender?.tokens - fine.ammountTokens
      }

      const newRecipent = {
        ...recipent,
        tokens: recipent?.tokens + fine.ammountTokens
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
        fines: [...fines, fine]
      })
    }
  }

  return useMutation({
    mutationFn: (fine: Fine) => fineImp.post(fine),
    onSuccess: fine => {
      addFineToContext(fine)

      toast.success('The fine was succefully created')
    },
    onError: () =>
      toast.error('Ops, something went wrong. Please try again laters.')
  })
}

export default useCreateFine
