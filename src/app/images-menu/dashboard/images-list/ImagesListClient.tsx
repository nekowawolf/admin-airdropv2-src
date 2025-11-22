'use client'

import { useImageData } from '@/hooks/images-resources/useImageData'
import ImagesTable from '@/components/image-resources/ImagesTable'
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export default function ImagesListClient() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useImageData()

  return (
    <ImagesTable
      data={data}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      title="Images Management"
      subtitle="Manage all uploaded images"
    />
  )
}