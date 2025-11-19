import AddImagesForm from '@/components/image-resources/AddImagesForm'
import { dashboardMetadata } from '@/constants/metadataTemplates'

export const metadata = dashboardMetadata('Upload Image', 'Upload images to GitHub CDN')

export default function Page() {
  return (
    <div>
      <AddImagesForm />
    </div>
  )
}