import { useState, useEffect } from 'react'
import { getBackerStats, BackerData } from '@/services/chartService'

export const useBackerData = () => {
  const [data, setData] = useState<BackerData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getBackerStats()
      setData(result)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch backer data')
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