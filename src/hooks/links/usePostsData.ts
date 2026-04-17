import { useState, useEffect } from 'react'
import { getPosts, deletePost } from '@/services/links/linkService'
import { LinkPost } from '@/types/link'

export function usePostsData() {
  const [data, setData] = useState<LinkPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getPosts()
      setData(res)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err: any) {
      throw err
    }
  }

  return { data, loading, error, handleDelete, refetch: fetchData }
}