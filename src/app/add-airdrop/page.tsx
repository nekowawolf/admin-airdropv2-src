import AddAirdropForm from '@/components/AddAirdropForm'
import { dashboardMetadata } from '@/constants/metadataTemplates'

export const metadata = dashboardMetadata('Add Airdrop', 'Add new airdrop campaign')

export default function Page() {
  return (
    <div>
      <AddAirdropForm />
    </div>
  )
}