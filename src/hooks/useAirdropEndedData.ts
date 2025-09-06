import { useState, useEffect } from 'react'
import { getAirdropEnded, deleteAirdrop } from '@/services/airdropService'

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

  const handleDelete = async (id: string) => {
    try {
      await deleteAirdrop(id)
      // Remove the deleted item from local state
      setData(prev => prev.filter(item => item.id !== id))
      return Promise.resolve()
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete airdrop')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    onDelete: handleDelete
  }
}