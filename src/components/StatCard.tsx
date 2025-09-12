'use client'

import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number | ReactNode
  icon?: ReactNode
  loading?: boolean
}

export default function StatCard({ title, value, icon, loading }: StatCardProps) {
  return (
    <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider flex items-center justify-between transition-colors">
      <div>
        <p className="text-sm text-secondary">{title}</p>
        <h3 className="text-2xl font-bold text-primary mt-1">
          {loading ? <span className="text-sm font-normal text-muted">Loading...</span> : value}
        </h3>
      </div>
      {icon && (
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
          <div className="text-xl">{icon}</div>
        </div>
      )}
    </div>
  )
}
