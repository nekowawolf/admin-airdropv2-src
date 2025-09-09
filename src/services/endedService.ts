import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAirdropEnded = async () => {
  const token = Cookies.get('token');

  if (!token) throw new Error('No authentication token found');

  try {
    const response = await fetch(`${API_BASE_URL}/airdrop/allairdrop`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch airdrops');
    }

    const responseData = await response.json();
    
    const endedData = Array.isArray(responseData.data) 
      ? responseData.data.filter((item: any) => 
          item && 
          item.status === 'ended' &&
          item.name && 
          item.task
        )
      : [];

    return endedData;
  } catch (err: any) {
    throw new Error(err.message || 'Failed to fetch ended airdrops');
  }
};

export const updateAirdropEnded = async (id: string, data: any) => {
  const token = Cookies.get('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/airdrop/allairdrop/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update airdrop');
  }

  return response.json();
};

export const getAirdropEndedById = async (id: string) => {
  const token = Cookies.get('token');

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/airdrop/allairdrop/${id}`, {
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

export const deleteAirdropEnded = async (id: string) => {
  const token = Cookies.get('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/airdrop/allairdrop/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete airdrop');
  }

  return response.json();
};