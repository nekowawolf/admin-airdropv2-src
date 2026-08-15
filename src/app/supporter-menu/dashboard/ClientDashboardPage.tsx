'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useSupporterData } from '@/hooks/supporter/useSupporterData'
import StatCard from '@/components/airdrops/chart/StatCard'
import SupporterCategoryChart from '@/components/supporter/SupporterCategoryChart'
import { FaUserCircle, FaDonate } from 'react-icons/fa'
import { TbCategoryFilled } from "react-icons/tb"
import { useMemo } from 'react'

export default function ClientDashboardPage() {
  useAuthGuard()
  const { data, loading } = useSupporterData()

  const totalSupporters = data.length
  
  const totalPlatforms = useMemo(() => {
    const platformSet = new Set()
    data.forEach(item => {
      if (item.platform) {
        platformSet.add(item.platform.trim())
      }
    })
    return platformSet.size
  }, [data])

  const totalAmount = useMemo(() => {
    let total = 0
    data.forEach(item => {
      if (item.amount) {
        total += item.amount
      }
    })
    return total
  }, [data])

  return (
    <div className="space-y-6 mt-6 sm:mt-0">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-semibold text-primary">
          Supporter Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-secondary">
          Overview of your Supporter stats
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Supporters"
          value={totalSupporters}
          icon={<FaUserCircle />}
          loading={loading}
        />
        <StatCard
          title="Total Platforms"
          value={totalPlatforms}
          icon={<TbCategoryFilled />}
          loading={loading}
        />
        <StatCard
          title="Total Donated (Amount)"
          value={totalAmount}
          icon={<FaDonate />}
          loading={loading}
        />
      </section>

      <section className="grid grid-cols-1 gap-4">
        <SupporterCategoryChart data={data} />
      </section>
    </div>
  )
}