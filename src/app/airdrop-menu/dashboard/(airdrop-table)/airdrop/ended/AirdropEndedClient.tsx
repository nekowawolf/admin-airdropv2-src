'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useAirdropEndedData } from '@/hooks/airdrop/useAirdropEndedData'
import EndedAirdropTable from '@/components/airdrops/AirdropTableEnded'

export default function EndedAirdropsPage() {
  useAuthGuard()
  const { data, loading, error, onDelete } = useAirdropEndedData()

  return (
    <EndedAirdropTable
      data={data}
      loading={loading}
      error={error}
      onDelete={onDelete}
      editRoute="/airdrop-menu/dashboard/edit-airdrop/ended"
    />
  )
}