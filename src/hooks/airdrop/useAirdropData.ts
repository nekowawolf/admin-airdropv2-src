import { useState, useEffect } from 'react'
import { getAirdropFree, deleteAirdropFree } from '@/services/airdrop/freeService'
import { getAirdropPaid, deleteAirdropPaid } from '@/services/airdrop/paidService'

type AirdropType = 'free' | 'paid'

export const useAirdropData = (type: AirdropType) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = type === 'free' ? await getAirdropFree() : await getAirdropPaid()
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item !== null && 
        item !== undefined && 
        item.status === 'active' && 
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
  }

  const handleDelete = async (id: string) => {
    try {
      if (type === 'free') {
        await deleteAirdropFree(id)
      } else {
        await deleteAirdropPaid(id)
      }
      setData(prev => prev.filter(item => item.id !== id))
    } catch (err: any) {
      throw new Error(err.message || `Failed to delete ${type} airdrop`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [type])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    handleDelete
  }
}