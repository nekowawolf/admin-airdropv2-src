'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

export function useAuthGuard() {
  const router = useRouter()
  
  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      toast.error('Login first to continue')
      router.push('/login')
    }
  }, [router])
}