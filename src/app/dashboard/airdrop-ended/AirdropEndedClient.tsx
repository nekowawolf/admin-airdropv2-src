'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useAirdropEndedData } from '@/hooks/useAirdropEndedData'
import EndedAirdropTable from '@/components/AirdropTableEnded'

export default function EndedAirdropsPage() {
  useAuthGuard()
  const { data, loading, error, onDelete } = useAirdropEndedData()

  return (
    <EndedAirdropTable
      data={data}
      loading={loading}
      error={error}
      onDelete={onDelete}
      editRoute="/edit-airdrop-ended"
    />
  )
}