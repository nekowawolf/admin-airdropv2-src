import { dashboardMetadata } from '@/constants/metadataTemplates'
import AddPostClient from './AddPostClient'

export const metadata = dashboardMetadata('Add Link Post', 'Create a new link post')

export default function Page() {
  return <AddPostClient />
}