import { useState } from 'react'
import { toast } from 'sonner'
import { uploadImage } from '@/services/images-resources/imageService'

export function useUploadImage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadImageFile = async (file: File): Promise<string | null> => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      const result = await uploadImage(file)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      return result.url
    } catch (err: any) {
      console.error('Error uploading image:', err)
      const errorMsg = err.message || 'Failed to upload image. Please try again.'
      toast.error(errorMsg)
      return null
    } finally {
      setIsUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  return { isUploading, uploadProgress, uploadImageFile }
}