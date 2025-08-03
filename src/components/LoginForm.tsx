'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      alert('All fields are required.')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_LOGIN!,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      )

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Login failed.')
      }

      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        router.push('/dashboard')
      } else {
        throw new Error('Invalid token received.')
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
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
        disabled={loading}
        className="flex h-10 items-center justify-between rounded-sm bg-blue-600 px-2 text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
      >
        <span>{loading ? 'Loading...' : 'ログイン'}</span>
        <span>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </span>
      </button>
    </form>
  )
}
