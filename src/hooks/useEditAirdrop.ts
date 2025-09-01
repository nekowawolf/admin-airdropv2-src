import { useState } from 'react'
import { updateAirdropFree } from '@/services/airdropService'
import { AirdropFreeRequest } from '@/types/airdrop'

export const useEditAirdrop = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const editAirdrop = async (id: string, data: AirdropFreeRequest) => {
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const payload = {
        ...data,
        price: Number(data.price),
        usd_income: Number(data.usd_income),
        link_claim: data.link_claim
      }

      await updateAirdropFree(id, payload)
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
