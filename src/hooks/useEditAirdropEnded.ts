import { useState } from 'react'
import { updateAirdropEnded } from '@/services/endedService'

export function useEditAirdrop() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const editAirdrop = async (id: string, data: any) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await updateAirdropEnded(id, data)
      setSuccessMessage('Airdrop updated successfully!')
      return Promise.resolve()
    } catch (err: any) {
      console.error('Error updating airdrop:', err)
      const errorMsg = err.message || 'Failed to update airdrop. Please try again.'
      setErrorMessage(errorMsg)
      return Promise.reject(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, editAirdrop }
}