import { authFetch } from '@/services/auth/authService'
import { SupportRequestResponse } from '@/types/supporter'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getSupportRequests = async (): Promise<SupportRequestResponse[]> => {
  const response = await authFetch(`${API_BASE_URL}/support-requests`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch Support Requests')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const deleteSupportRequest = async (_id: string) => {
  const response = await authFetch(`${API_BASE_URL}/support-requests/${_id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete Support Request')
  }

  return response.json()
}