'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export default function ClientPage() {
  useAuthGuard()

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">Feedback</h2>
        <p className="text-xs sm:text-sm text-secondary">Coming soon in a future update</p>
      </div>

      <div className="flex justify-center items-center py-20">
        <div className="text-center space-y-3">
          <p className="text-secondary text-sm">This feature is not available yet.</p>
        </div>
      </div>
    </div>
  )
}