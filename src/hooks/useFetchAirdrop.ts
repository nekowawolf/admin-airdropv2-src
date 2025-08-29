import { useEffect, useState } from 'react'
import { getAirdropFree } from '@/services/airdropService'

export function useFetchAirdropFree() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await getAirdropFree()
        setData((result.data || result).reverse())
      } catch (err: any) {
        setError(err.message || 'Failed to fetch airdrops')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
