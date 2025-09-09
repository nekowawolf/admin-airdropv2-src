import Cookies from 'js-cookie';
import { AirdropPaidRequest } from '@/types/airdrop';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createAirdropPaid = async (data: AirdropPaidRequest) => {
  const token = Cookies.get('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/airdrop/paidairdrop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create paid airdrop');
  }

  return response.json();
};

export const getAirdropPaid = async () => {
  const token = Cookies.get('token')

  if (!token) throw new Error('No authentication token found')

  const response = await fetch(`${API_BASE_URL}/airdrop/paidairdrop`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch paid airdrops')
  }

  const data = await response.json()
  return Array.isArray(data.data) ? data.data : []
}

export const updateAirdropPaid = async (id: string, data: AirdropPaidRequest) => {
  const token = Cookies.get('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/airdrop/paidairdrop/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update paid airdrop');
  }

  return response.json();
};

export const getAirdropPaidById = async (id: string) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/airdrop/paidairdrop/${id}`, {
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

export const deleteAirdropPaid = async (id: string) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/airdrop/paidairdrop/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete paid airdrop');
  }

  return response.json();
};