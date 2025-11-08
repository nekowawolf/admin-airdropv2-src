import { authFetch } from '@/services/auth/authService'
import { CommunityRequest } from '@/types/community'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createCommunity = async (data: CommunityRequest) => {
  const response = await authFetch(`${API_BASE_URL}/airdrop/cryptocommunity`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create community')
  }

  return response.json()
}
