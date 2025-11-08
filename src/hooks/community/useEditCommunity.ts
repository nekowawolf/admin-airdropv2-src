import { useState } from 'react'
import { updateCommunity } from '@/services/community/communityService'
import { CommunityRequest } from '@/types/community'

export const useEditCommunity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const editCommunity = async (_id: string, data: CommunityRequest) => {
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      await updateCommunity(_id, data)
      setSuccessMessage('Community updated successfully!')
      return true
    } catch (error: any) {
      const message = error.message || 'Failed to update community'
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
    editCommunity
  }
}