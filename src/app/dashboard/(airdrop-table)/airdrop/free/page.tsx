import { dashboardMetadata } from '@/constants/metadataTemplates'
import AirdropFreeClient from './AirdropFreeClient'

export const metadata = dashboardMetadata('Airdrop Free', 'Airdrop Free Dashboard')

export default function Page() {
  return <AirdropFreeClient />
}