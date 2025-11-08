'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { refreshAccessToken } from '@/services/auth/authService'

export function useAuthGuard() {
  const router = useRouter()

  useEffect(() => {
    const refreshToken = Cookies.get('refresh_token')
    if (!refreshToken) {
      toast.error('Login first to continue')
      router.push('/login')
      return
    }

    const checkToken = async () => {
      const accessToken = Cookies.get('access_token')
      if (!accessToken) {
        try {
          await refreshAccessToken()
        } catch {
          toast.error('Session expired, please login again')
          router.push('/login')
        }
      }
    }

    checkToken()
  }, [router])
}
