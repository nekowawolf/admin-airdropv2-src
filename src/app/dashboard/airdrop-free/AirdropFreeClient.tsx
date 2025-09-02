'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useAirdropData } from '@/hooks/useAirdropData'
import AirdropTable from '@/components/AirdropTable'

export default function AirdropFreePage() {
  useAuthGuard()
  
  const { data, loading, error, handleDelete } = useAirdropData('free')

  return (
    <AirdropTable
      data={data}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      editRoute="/edit-airdrop"
      title="Airdrop Free"
      subtitle="List of free airdrop campaigns"
    />
  )
}