'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'

export default function ClientDashboardPage() {
  useAuthGuard()

  return (
    <div className="space-y-6">
    <div className="text-center sm:text-left">
      <h2 className="text-lg sm:text-2xl font-semibold text-primary">
        Dashboard Analytics
      </h2>
      <p className="text-xs sm:text-sm text-secondary">
        Overview of your project stats
      </p>
    </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
      </section>
    </div>
  )
}