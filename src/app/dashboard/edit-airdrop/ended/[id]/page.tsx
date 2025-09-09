import { dashboardMetadata } from '@/constants/metadataTemplates'
import EditEndedClient from './EditEndedClient'

export const metadata = dashboardMetadata('Edit Airdrop Ended', 'Edit airdrop ended data')

export default function Page() {
  return <EditEndedClient />
}