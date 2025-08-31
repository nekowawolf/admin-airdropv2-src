import { dashboardMetadata } from '@/constants/metadataTemplates'
import ClientDashboardPage from './ClientDashboardPage'

export const metadata = dashboardMetadata('Dashboard', 'Airdrop Dashboard')

export default function Page() {
  return <ClientDashboardPage />
}