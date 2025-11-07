import { dashboardMetadata } from '@/constants/metadataTemplates'
import EditFreeClient from './EditFreeClient'

export const metadata = dashboardMetadata('Edit Airdrop Free', 'Edit airdrop free data')

export default function Page() {
  return <EditFreeClient />
}