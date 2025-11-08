import { dashboardMetadata } from '@/constants/metadataTemplates'
import CommunityListClient from './CommunityListClient'

export const metadata = dashboardMetadata('Community List', 'Manage all crypto communities')

export default function Page() {
  return <CommunityListClient />
}