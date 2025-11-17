import { dashboardMetadata } from '@/constants/metadataTemplates'
import ImagesListClient from './ImagesListClient'

export const metadata = dashboardMetadata('Airdrop Ended', 'Airdrop Ended Dashboard')

export default function Page() {
  return <ImagesListClient />
}