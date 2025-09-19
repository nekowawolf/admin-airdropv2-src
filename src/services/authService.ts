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

  if (data.access_token && data.refresh_token) {
    Cookies.set('access_token', data.access_token, {
      expires: 1 / 96,
      secure: true,
      sameSite: 'strict',
    })
    Cookies.set('refresh_token', data.refresh_token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    })
    return data
  } else {
    throw new Error('Invalid tokens received.')
  }
}

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refresh_token')
  if (!refreshToken) throw new Error('No refresh token found')

  const res = await fetch(`${API_BASE_URL}/airdrop/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!res.ok) throw new Error('Failed to refresh token')
  const data = await res.json()

  if (data.access_token) {
    Cookies.set('access_token', data.access_token, {
      expires: 1 / 96,
      secure: true,
      sameSite: 'strict',
    })
  }
  return data.access_token
}

export const logout = async () => {
  try {
    const refreshToken = Cookies.get('refresh_token')

    if (refreshToken) {
      await fetch(`${API_BASE_URL}/airdrop/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
    }

    Cookies.remove('access_token')
    Cookies.remove('refresh_token')

    return { success: true, message: 'Logout successfully!' }
  } catch (error) {
    throw new Error('Logout failed')
  }
}