'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useCreatorsData } from '@/hooks/creators/useCreatorsData'
import StatCard from '@/components/airdrops/chart/StatCard'
import CreatorsCategoryChart from '@/components/creators/CreatorsCategoryChart'
import { TiMediaPause } from "react-icons/ti"
import { TbCategoryFilled } from "react-icons/tb"
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useCreatorsData()

  const totalCreators = data.length
  
  const totalCategories = useMemo(() => {
    const catSet = new Set()
    data.forEach(item => {
      if (item.category && typeof item.category === 'string') {
        catSet.add(item.category.trim())
      }
    })
    return catSet.size
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Creators Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your Creators stats
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Creators"
          value={totalCreators}
          icon={<TiMediaPause />}
          loading={loading}
        />
        <StatCard
          title="Total Categories"
          value={totalCategories}
          icon={<TbCategoryFilled />}
          loading={loading}
        />
      </section>

      <section className="grid grid-cols-1 gap-4">
        <CreatorsCategoryChart data={data} />
      </section>
    </div>
  )
}