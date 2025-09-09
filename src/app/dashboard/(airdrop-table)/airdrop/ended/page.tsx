import { dashboardMetadata } from '@/constants/metadataTemplates'
import AirdropEndedClient from './AirdropEndedClient'

export const metadata = dashboardMetadata('Airdrop Ended', 'Airdrop Ended Dashboard')

export default function Page() {
  return <AirdropEndedClient />
}