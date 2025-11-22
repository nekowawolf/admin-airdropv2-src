import { useState, useEffect } from 'react'
import { getAllImages, deleteImage } from '@/services/images-resources/imageService'
import { Image } from '@/types/image'

export const useImageData = () => {
  const [data, setData] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await getAllImages()
      const validData = Array.isArray(result) ? result.filter(item => 
        item && 
        item._id && 
        item.filename && 
        item.url
      ) : []
      setData(validData.reverse())
    } catch (err: any) {
      setError(err.message || 'Failed to fetch images')
      console.error('Error fetching images:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteImage(id)
      setData(prev => prev.filter(item => item._id !== id))
      return Promise.resolve()
    } catch (err: any) {
      console.error('Error deleting image:', err)
      throw new Error(err.message || 'Failed to delete image')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    handleDelete
  }
}