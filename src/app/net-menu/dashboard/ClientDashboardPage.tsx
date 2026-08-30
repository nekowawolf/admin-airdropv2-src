'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useNetData } from '@/hooks/net/useNetData'
import StatCard from '@/components/airdrops/chart/StatCard'
import NetCategoryChart from '@/components/net/NetCategoryChart'
import { FaGlobe } from 'react-icons/fa'
import { TbCategoryFilled } from "react-icons/tb"
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useNetData()

  const totalNet = data.length
  
  const totalCategories = useMemo(() => {
    const catSet = new Set()
    data.forEach(item => {
      if (item.categories) {
        item.categories.forEach((cat: string) => catSet.add(cat.trim()))
      }
    })
    return catSet.size
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Net Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your Net stats
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Net"
          value={totalNet}
          icon={<FaGlobe />}
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
        <NetCategoryChart data={data} />
      </section>
    </div>
  )
}