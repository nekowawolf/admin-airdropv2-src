import { dashboardMetadata } from '@/constants/metadataTemplates'
import AddAirdropForm from './AddAirdropForm'

export const metadata = dashboardMetadata('Add Airdrop', 'Add new airdrop campaign')

export default function Page() {
  return <AddAirdropForm />
}
