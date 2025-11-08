'use client'

import { useCommunityData } from '@/hooks/community/useCommunityData'
import CommunityTable from '@/components/community/CommunityTable'

export default function CommunitiesPage() {
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