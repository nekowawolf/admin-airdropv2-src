import AddACommunityForm from '@/components/community/AddACommunityForm'
import { dashboardMetadata } from '@/constants/metadataTemplates'

export const metadata = dashboardMetadata('Add Community', 'Add new Community')

export default function Page() {
  return (
    <div>
      <AddACommunityForm />
    </div>
  )
}