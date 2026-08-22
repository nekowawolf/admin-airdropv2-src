import { dashboardMetadata } from '@/constants/metadataTemplates'
import ImagesListClient from './ImagesListClient'

export const metadata = dashboardMetadata('Media Management', 'Manage all uploaded media')

export default function Page() {
  return <ImagesListClient />
}