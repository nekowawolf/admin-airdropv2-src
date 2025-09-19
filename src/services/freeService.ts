import Cookies from 'js-cookie';
import { AirdropFreeRequest } from '@/types/airdrop';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createAirdropFree = async (data: AirdropFreeRequest) => {
  const token = Cookies.get('access_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/airdrop/freeairdrop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create free airdrop');
  }

  return response.json();
};

export const getAirdropFree = async () => {
  const token = Cookies.get('access_token')

  if (!token) throw new Error('No authentication token found')

  const response = await fetch(`${API_BASE_URL}/airdrop/freeairdrop`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch free airdrops')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateAirdropFree = async (id: string, data: AirdropFreeRequest) => {
  const token = Cookies.get('access_token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/airdrop/freeairdrop/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update free airdrop');
  }

  return response.json();
};

export const getAirdropFreeById = async (id: string) => {
  const token = Cookies.get('access_token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/airdrop/freeairdrop/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch airdrop');
  }

  const data = await response.json();
  return data.data;
};

export const deleteAirdropFree = async (id: string) => {
  const token = Cookies.get('access_token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/airdrop/freeairdrop/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete free airdrop');
  }

  return response.json();
};