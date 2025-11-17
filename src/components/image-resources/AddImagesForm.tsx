'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'

export default function AddACommunityForm() {
  useAuthGuard()
  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Add New Image
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Create a new list Image
        </p>
      </div>

    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
    </section>
  </div>
  )
}