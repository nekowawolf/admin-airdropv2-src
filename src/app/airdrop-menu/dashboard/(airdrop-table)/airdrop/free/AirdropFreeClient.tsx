'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useAirdropData } from '@/hooks/airdrop/useAirdropData'
import AirdropTable from '@/components/airdrops/AirdropTable'

export default function AirdropFreePage() {
  useAuthGuard()
  
  const { data, loading, error, handleDelete } = useAirdropData('free')

  return (
    <AirdropTable
      data={data}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      editRoute="/airdrop-menu/dashboard/edit-airdrop/free"
      title="Airdrop Free"
      subtitle="List of free airdrop campaigns"
    />
  )
}