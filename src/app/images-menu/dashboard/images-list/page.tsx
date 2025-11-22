import { dashboardMetadata } from '@/constants/metadataTemplates'
import ImagesListClient from './ImagesListClient'

export const metadata = dashboardMetadata('Images Management', 'Manage all uploaded images')

export default function Page() {
  return <ImagesListClient />
}