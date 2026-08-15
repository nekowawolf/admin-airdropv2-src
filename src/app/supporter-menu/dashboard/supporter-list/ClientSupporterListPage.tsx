'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useSupporterData } from '@/hooks/supporter/useSupporterData'
import SupporterTable from '@/components/supporter/SupporterTable'

export default function ClientSupporterListPage() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useSupporterData()

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <SupporterTable
        data={data}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        title="Supporter List"
        subtitle="Manage your Supporter listings"
      />
    </div>
  )
}