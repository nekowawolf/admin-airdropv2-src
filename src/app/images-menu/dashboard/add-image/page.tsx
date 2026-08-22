import AddImagesForm from '@/components/image-resources/AddImagesForm'
import { dashboardMetadata } from '@/constants/metadataTemplates'

export const metadata = dashboardMetadata('Upload Media', 'Upload media to Cloudflare CDN')

export default function Page() {
  return (
    <div>
      <AddImagesForm />
    </div>
  )
}