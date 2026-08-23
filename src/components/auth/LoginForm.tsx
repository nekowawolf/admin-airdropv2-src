'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { login } from '@/services/auth/authService'
import { Turnstile } from '@marsidev/react-turnstile'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = await login(username, password, turnstileToken)
      localStorage.setItem('lastLogin', new Date().toISOString())
      toast.success('Login successfully!')
      router.push('/airdrop-menu/dashboard')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-3">
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-10 rounded-sm bg-white px-2 focus:outline-none focus:ring focus:ring-blue-400"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 w-full rounded-sm bg-white px-2 focus:outline-none focus:ring focus:ring-blue-400"
          required
        />
        <i
          onClick={togglePassword}
          className={`fa-regular ${
            showPassword ? 'fa-eye' : 'fa-eye-slash'
          } absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !turnstileToken}
        className="flex h-10 cursor-pointer items-center justify-between rounded-sm bg-blue-600 px-2 text-white transition-colors duration-300 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-blue-400"
      >
        <span>{loading ? 'Loading...' : 'ログイン'}</span>
        <span>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </span>
      </button>
      </form>
      <div className="flex justify-center w-full pt-4 mt-2">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken("")}
          onExpire={() => setTurnstileToken("")}
        />
      </div>
    </>
  )
}