import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error('All fields are required.')
  }

  const res = await fetch(`${API_BASE_URL}/airdrop/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Login failed.')
  }

  const data = await res.json()
  if (data.token) {
    Cookies.set('token', data.token, {
      expires: 1,
      secure: true,
      sameSite: 'strict',
    })
    return data
  } else {
    throw new Error('Invalid token received.')
  }
}

export const logout = () => {
  try {
    Cookies.remove('token')
    
    return { success: true, message: 'Logout successfully!' }
  } catch (error) {
    throw new Error('Logout failed')
  }
}