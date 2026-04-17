import { dashboardMetadata } from '@/constants/metadataTemplates'
import AddPostForm from '@/components/links/AddPostForm'

export const metadata = dashboardMetadata('Add Link Post', 'Create a new link post')

export default function Page() {
  return <AddPostForm />
}