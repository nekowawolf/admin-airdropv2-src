'use client'

import { useCommunityData } from '@/hooks/community/useCommunityData'
import CommunityTable from '@/components/community/CommunityTable'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export default function CommunitiesPage() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useCommunityData()

  return (
    <CommunityTable
      data={data}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      editRoute="/community-menu/dashboard/edit-community"
      title="Community Management"
      subtitle="Manage all crypto communities"
    />
  )
}