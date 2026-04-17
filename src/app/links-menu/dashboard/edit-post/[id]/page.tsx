import { dashboardMetadata } from '@/constants/metadataTemplates'
import EditPostForm from '@/components/links/EditPostForm'

export const metadata = dashboardMetadata('Edit Link Post', 'Edit link post data')

export default function Page({ params }: { params: { id: string } }) {
  return <EditPostForm />
}