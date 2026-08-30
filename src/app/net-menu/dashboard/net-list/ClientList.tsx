'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useNetData } from '@/hooks/net/useNetData'
import NetTable from '@/components/net/NetTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useNetData()

  return (
    <div>
      <NetTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}