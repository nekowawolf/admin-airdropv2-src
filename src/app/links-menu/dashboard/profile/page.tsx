import { dashboardMetadata } from '@/constants/metadataTemplates'
import ProfileClient from './ProfileClient'

export const metadata = dashboardMetadata('Link Profile', 'Manage your social profile links')

export default function Page() {
  return <ProfileClient />
}