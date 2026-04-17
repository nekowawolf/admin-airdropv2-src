import { dashboardMetadata } from '@/constants/metadataTemplates'
import PostsClient from './PostsClient'

export const metadata = dashboardMetadata('Link Posts', 'Manage all link posts')

export default function Page() {
  return <PostsClient />
}