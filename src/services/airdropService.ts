import Cookies from 'js-cookie';
import { AirdropFreeRequest, AirdropPaidRequest } from '@/types/airdrop';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createAirdropFree = async (data: AirdropFreeRequest) => {
  const token = Cookies.get('token');
  
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

export const getAirdropFree = async () => {
  const token = Cookies.get('token')

  if (!token) {
    throw new Error('No authentication token found')
  }

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

  const airdrops = Array.isArray(data.data) ? data.data : []
  return airdrops.filter((item: any) => 
    item && 
    item !== null && 
    item !== undefined && 
    item.status === 'active' && 
    item.name && 
    item.task && 
    item.level && 
    item.status && 
    item.backed && 
    item.funds 
  )
}

export const deleteAirdropFree = async (id: string) => {
  const token = Cookies.get('token');

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

export const updateAirdropFree = async (id: string, data: AirdropFreeRequest) => {
  const token = Cookies.get('token');
  
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
  const token = Cookies.get('token');

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

export const getAirdropPaid = async () => {
  const token = Cookies.get('token')

  if (!token) {
    throw new Error('No authentication token found')
  }

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

  const airdrops = Array.isArray(data.data) ? data.data : []
  return airdrops.filter((item: any) => 
    item && 
    item !== null && 
    item !== undefined && 
    item.status === 'active' && 
    item.name && 
    item.task && 
    item.level && 
    item.status &&
    item.backed &&
    item.funds
  )
}

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