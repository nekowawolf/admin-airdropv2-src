import { dashboardMetadata } from '@/constants/metadataTemplates'
import AirdropPaidClient from './AirdropPaidClient'

export const metadata = dashboardMetadata('Airdrop Paid', 'Airdrop Paid Dashboard')

export default function Page() {
  return <AirdropPaidClient />
}