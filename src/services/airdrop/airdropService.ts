import { authFetch } from '@/services/auth/authService'
import { AirdropRequest, AirdropBase } from '@/types/airdrop'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createAirdrop = async (data: AirdropRequest) => {
  const response = await authFetch(`${API_BASE_URL}/admin/airdrops`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to create airdrop')
  }

  return response.json()
}

export const getAirdrops = async (isPaid?: boolean) => {
  let url = `${API_BASE_URL}/admin/airdrops`
  if (isPaid !== undefined) {
    url += `?is_paid=${isPaid}`
  }
  
  const response = await authFetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch airdrops')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateAirdrop = async (id: string, data: AirdropRequest) => {
  const response = await authFetch(`${API_BASE_URL}/admin/airdrops/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to update airdrop')
  }

  return response.json()
}

export const getAirdropById = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/admin/airdrops/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to fetch airdrop')
  }

  const data = await response.json()
  return data.data as AirdropBase
}

export const deleteAirdrop = async (id: string) => {
  const response = await authFetch(`${API_BASE_URL}/admin/airdrops/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || 'Failed to delete airdrop')
  }

  return response.json()
}
