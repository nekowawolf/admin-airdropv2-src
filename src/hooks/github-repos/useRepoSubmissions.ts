import { useState, useEffect } from 'react'
import { getRepoSubmissions, deleteRepoSubmission } from '@/services/github-repos/githubReposService'
import { RepoSubmission } from '@/types/github-repos'

export const useRepoSubmissions = () => {
  const [data, setData] = useState<RepoSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getRepoSubmissions()
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item !== null && 
        item !== undefined && 
        item.repo_url
      ) : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch repo submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteRepoSubmission(id)
      setData(prev => prev.filter(item => item._id !== id))
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete repo submission')
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