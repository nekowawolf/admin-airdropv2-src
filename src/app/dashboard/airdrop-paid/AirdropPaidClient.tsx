'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useAirdropData } from '@/hooks/useAirdropData'
import AirdropTable from '@/components/AirdropTable'

export default function AirdropPaidPage() {
  useAuthGuard()
  
  const { data, loading, error, handleDelete } = useAirdropData('paid')

  return (
    <AirdropTable
      data={data}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      editRoute="/dashboard/edit-airdrop/paid"
      title="Airdrop Paid"
      subtitle="List of paid airdrop campaigns"
    />
  )
}