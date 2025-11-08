import { useState, useEffect, useRef } from 'react'
import { getBackerStats, BackerData } from '@/services/airdrop/chartService'
import { getMonthlyAirdropStatsByYear, MonthlyAirdropData } from '@/services/airdrop/chartService'
import { getProjectMetrics, ProjectMetric } from '@/services/airdrop/chartService'

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

export const useMonthlyAirdropData = (year?: number | null) => {
  const [data, setData] = useState<MonthlyAirdropData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await getMonthlyAirdropStatsByYear(year || undefined)
      setData(result)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch monthly airdrop data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [year])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

export const useProjectMetrics = () => {
  const [data, setData] = useState<ProjectMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  const fetchData = async () => {
    if (hasFetched.current) return
    
    try {
      setLoading(true)
      hasFetched.current = true
      const result = await getProjectMetrics()
      setData(result)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch project metrics')
      hasFetched.current = false
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
    refetch: () => {
      hasFetched.current = false
      fetchData()
    }
  }
}