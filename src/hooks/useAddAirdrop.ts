import { useState } from 'react'
import { toast } from 'sonner'
import { createAirdropFree, createAirdropPaid } from '@/services/airdropService'
import { AirdropFreeRequest, AirdropPaidRequest } from '@/types/airdrop'

export function useAddAirdrop() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitAirdrop = async (
    data: AirdropFreeRequest | AirdropPaidRequest,
    type: 'free' | 'paid'
  ) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      if (type === 'free') {
        await createAirdropFree(data as AirdropFreeRequest)
        toast.success('Free airdrop created successfully!')
        setSuccessMessage('Free airdrop created successfully!')
      } else {
        await createAirdropPaid(data as AirdropPaidRequest)
        toast.success('Paid airdrop created successfully!')
        setSuccessMessage('Paid airdrop created successfully!')
      }
    } catch (err: any) {
      console.error('Error creating airdrop:', err)
      const errorMsg = err.message || 'Failed to create airdrop. Please try again.'
      setErrorMessage(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitAirdrop }
}