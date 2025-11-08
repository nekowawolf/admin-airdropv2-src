'use client'

import CommunityTable from '@/components/community/CommunityTable'
import { dashboardMetadata } from '@/constants/metadataTemplates'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export const metadata = dashboardMetadata('Add Airdrop', 'Add new airdrop campaign')

export default function Page() {
  useAuthGuard()
  return (
    <div>
      <CommunityTable />
    </div>
  )
}
