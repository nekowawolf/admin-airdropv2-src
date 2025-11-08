import { dashboardMetadata } from '@/constants/metadataTemplates'
import CommunityListClient from './CommunityListClient'

export const metadata = dashboardMetadata('Airdrop Ended', 'Airdrop Ended Dashboard')

export default function Page() {
  return <CommunityListClient />
}