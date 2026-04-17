'use client'

import { usePostsData } from '@/hooks/links/usePostsData'
import LinkPostTable from '@/components/links/LinkPostTable'

export default function PostsClient() {
  const { data, loading, error, handleDelete } = usePostsData()

  return (
    <div className="animate-[slideIn_0.3s_ease-out]">
      <LinkPostTable
        data={data}
        loading={loading}
        error={error}
        onDelete={handleDelete}
        editRoute="/links-menu/dashboard/edit-post"
        title="Link Posts Management"
        subtitle="Manage all link posts"
      />
    </div>
  )
}