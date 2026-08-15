import { useState } from 'react'
import { createSupporter } from '@/services/supporter/supporterService'
import { SupporterResponse } from '@/types/supporter'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useAddSupporter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const submitSupporter = async (data: Omit<SupporterResponse, '_id' | 'created_at'>) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      await createSupporter(data)
      toast.success('Supporter added successfully!')
      router.push('/supporter-menu/dashboard/supporter-list')
    } catch (err: any) {
      setError(err.message || 'Failed to add Supporter')
      toast.error(err.message || 'Failed to add Supporter')
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    error,
    submitSupporter
  }
}