'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useAirdropData } from '@/hooks/airdrop/useAirdropData'
import AirdropTable from '@/components/airdrops/AirdropTable'

export default function AirdropPaidPage() {
  useAuthGuard()
  
  const { data, loading, error, handleDelete } = useAirdropData('paid')

  return (
    <AirdropTable
      data={data}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      editRoute="/airdrop-menu/dashboard/edit-airdrop/paid"
      title="Airdrop Paid"
      subtitle="List of paid airdrop campaigns"
    />
  )
}