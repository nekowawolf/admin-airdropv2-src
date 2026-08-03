import { useState } from 'react'
import { updateAirdrop } from '@/services/airdrop/airdropService'
import { AirdropRequest } from '@/types/airdrop'

type AirdropType = 'free' | 'paid'

export const useEditAirdrop = (type: AirdropType) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const editAirdrop = async (id: string, data: AirdropRequest) => {
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const payload = {
        ...data,
        price: Number(data.price),
        usd_income: Number(data.usd_income),
        is_paid: type === 'paid'
      }

      await updateAirdrop(id, payload as AirdropRequest)

      setSuccessMessage('Airdrop updated successfully!')
      return true
    } catch (error: any) {
      const message = error.message || 'Failed to update airdrop'
      setErrorMessage(message)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    successMessage,
    errorMessage,
    editAirdrop
  }
}
