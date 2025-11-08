import { useState, useEffect } from 'react'
import { getCommunity, deleteCommunity } from '@/services/community/communityService'

export const useCommunityData = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getCommunity()
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item !== null && 
        item !== undefined && 
        item.name && 
        item.platforms && 
        item.category && 
        item.link_url
      ) : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch communities')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCommunity(id)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete community')
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
    handleDelete
  }
}