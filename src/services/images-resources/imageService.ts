import { authFetch } from '@/services/auth/authService'
import { Image } from '@/types/image'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const uploadImage = async (file: File): Promise<{ message: string; data: Image }> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await authFetch(`${API_BASE_URL}/images`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to upload media')
  }

  return response.json()
}

export const getAllImages = async (): Promise<Image[]> => {
  const response = await authFetch(`${API_BASE_URL}/images`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to fetch media')
  }

  const result = await response.json()
  
  return result.data || []
}

export const deleteImage = async (id: string): Promise<void> => {
  const response = await authFetch(`${API_BASE_URL}/images/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to delete media')
  }

  return response.json()
}