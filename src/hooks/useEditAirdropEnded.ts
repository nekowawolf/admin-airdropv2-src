import { useState } from 'react'
import { toast } from 'sonner'
import { updateAirdrop } from '@/services/airdropService'

export function useEditAirdrop() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const editAirdrop = async (id: string, data: any) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await updateAirdrop(id, data)
      toast.success('Airdrop updated successfully!')
      setSuccessMessage('Airdrop updated successfully!')
      return Promise.resolve()
    } catch (err: any) {
      console.error('Error updating airdrop:', err)
      const errorMsg = err.message || 'Failed to update airdrop. Please try again.'
      setErrorMessage(errorMsg)
      toast.error(errorMsg)
      return Promise.reject(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, editAirdrop }
}