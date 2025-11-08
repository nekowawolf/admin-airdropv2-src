import { dashboardMetadata } from '@/constants/metadataTemplates'
import EditCommunityClient from './EditCommunityClient'

export const metadata = dashboardMetadata('Edit Community', 'Edit and manage community details')

export default function Page() {
  return <EditCommunityClient />
}