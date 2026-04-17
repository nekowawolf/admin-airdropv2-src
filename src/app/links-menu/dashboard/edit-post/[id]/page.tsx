import { dashboardMetadata } from '@/constants/metadataTemplates'
import EditPostClient from './EditPostClient'

export const metadata = dashboardMetadata('Edit Link Post', 'Edit link post data')

export default function Page() {
  return <EditPostClient />
}