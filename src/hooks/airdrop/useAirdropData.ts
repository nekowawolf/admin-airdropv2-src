import { useState, useEffect, useCallback } from 'react'
import { getAirdrops, deleteAirdrop } from '@/services/airdrop/airdropService'

type AirdropType = 'free' | 'paid'

export const useAirdropData = (type: AirdropType) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const isPaid = type === 'paid'
      const result = await getAirdrops(isPaid)
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item !== null && 
        item !== undefined && 
        item.status !== 'ended' && !item.ended_at &&
        item.name && 
        item.task && 
        item.level && 
        item.status && 
        item.backed && 
        item.funds
      ) : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || `Failed to fetch ${type} airdrops`)
    } finally {
      setLoading(false)
    }
  }, [type])

  const handleDelete = async (id: string) => {
    try {
      await deleteAirdrop(id)
      setData(prev => prev.filter(item => (item.id || item._id) !== id))
    } catch (err: any) {
      throw new Error(err.message || `Failed to delete ${type} airdrop`)
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
    handleDelete
  }
}
