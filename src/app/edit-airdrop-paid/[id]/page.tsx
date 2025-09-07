import { dashboardMetadata } from '@/constants/metadataTemplates'
import EditPaidClient from './EditPaidClient'

export const metadata = dashboardMetadata('Edit Airdrop Paid', 'Edit airdrop paid data')

export default function Page() {
  return <EditPaidClient />
}