import { useState, useEffect, useCallback } from 'react'
import { getAirdrops, deleteAirdrop } from '@/services/airdrop/airdropService'

export const useAirdropEndedData = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await getAirdrops()
      const validData = Array.isArray(result) ? result.filter(item => item.status === 'ended' || item.ended_at) : []

      const sortedData = validData.sort((a, b) => {
        const dateA = new Date(a.ended_at || 0).getTime()
        const dateB = new Date(b.ended_at || 0).getTime()
        return dateB - dateA 
      })

      setData(sortedData)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch ended airdrops')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deleteAirdrop(id)
      setData(prev => prev.filter(item => (item.id || item._id) !== id))
      return Promise.resolve()
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete airdrop')
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    onDelete: handleDelete
  }
}
