'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useCreatorsData } from '@/hooks/creators/useCreatorsData'
import CreatorsTable from '@/components/creators/CreatorsTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useCreatorsData()

  return (
    <div>
      <CreatorsTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}