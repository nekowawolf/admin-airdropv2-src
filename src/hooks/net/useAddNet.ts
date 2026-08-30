import { useState } from 'react'
import { toast } from 'sonner'
import { createNet } from '@/services/net/netService'
import { NetRequest } from '@/types/net'

export function useAddNet() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitNet = async (data: NetRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createNet(data)
      toast.success('Net added successfully!')
      setSuccessMessage('Net added successfully!')
    } catch (err: any) {
      console.error('Error creating Net:', err)
      const errorMsg = err.message || 'Failed to add Net. Please try again.'
      toast.error(errorMsg)
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitNet }
}