import { useState } from 'react'
import { toast } from 'sonner'
import { createCommunity } from '@/services/community/communityService'
import { CommunityRequest } from '@/types/community'

export function useAddCommunity() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitCommunity = async (data: CommunityRequest) => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await createCommunity(data)
      toast.success('Community added successfully!')
      setSuccessMessage('Community added successfully!')
    } catch (err: any) {
      console.error('Error creating community:', err)
      const errorMsg = err.message || 'Failed to add community. Please try again.'
      toast.error(errorMsg)
      setErrorMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitCommunity }
}