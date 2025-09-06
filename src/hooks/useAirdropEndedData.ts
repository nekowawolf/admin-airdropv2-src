import { useState, useEffect } from 'react'
import { getAirdropEnded } from '@/services/airdropService'

export const useAirdropEndedData = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getAirdropEnded()
      
      const validData = Array.isArray(result) ? result : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch ended airdrops')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}