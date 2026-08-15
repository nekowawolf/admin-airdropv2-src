'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useSupportRequestsData } from '@/hooks/supporter/useSupportRequestsData'
import SupportRequestsTable from '@/components/supporter/SupportRequestsTable'

export default function ClientSupportRequestsPage() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useSupportRequestsData()

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <SupportRequestsTable
        data={data}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        title="Support Requests"
        subtitle="Manage user-submitted Support Requests"
      />
    </div>
  )
}
