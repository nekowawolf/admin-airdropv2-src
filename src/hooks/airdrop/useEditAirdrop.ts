import { useState } from 'react'
import { updateAirdropFree } from '@/services/airdrop/freeService'
import { updateAirdropPaid } from '@/services/airdrop/paidService'
import { AirdropFreeRequest, AirdropPaidRequest } from '@/types/airdrop'

type AirdropType = 'free' | 'paid'

export const useEditAirdrop = (type: AirdropType) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const editAirdrop = async (id: string, data: AirdropFreeRequest | AirdropPaidRequest) => {
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const payload = {
        ...data,
        price: Number(data.price),
        usd_income: Number(data.usd_income),
        link_claim: (data as any).link_claim
      }

      if (type === 'free') {
        await updateAirdropFree(id, payload as AirdropFreeRequest)
      } else {
        await updateAirdropPaid(id, payload as AirdropPaidRequest)
      }

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