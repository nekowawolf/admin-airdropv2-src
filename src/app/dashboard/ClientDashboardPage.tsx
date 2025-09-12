'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useAirdropData } from '@/hooks/useAirdropData'
import { useAirdropEndedData } from '@/hooks/useAirdropEndedData'
import StatCard from '@/components/StatCard'
import { Gift, TimerOff, DollarSign, Rocket } from 'lucide-react'

function LoadingText() {
  return <span className="text-xs text-muted-foreground">Loading...</span>
}

export default function ClientDashboardPage() {
  useAuthGuard()

  const { data: freeData, loading: loadingFree } = useAirdropData('free')
  const { data: paidData, loading: loadingPaid } = useAirdropData('paid')
  const { data: endedData, loading: loadingEnded } = useAirdropEndedData()

  const totalAllTime =
    (freeData?.length || 0) +
    (paidData?.length || 0) +
    (endedData?.length || 0)

  const totalEnded = endedData?.length || 0
  const totalActive = totalAllTime - totalEnded

  const totalUsdIncome = [
    ...(freeData || []),
    ...(paidData || []),
    ...(endedData || []),
  ].reduce((sum, item) => sum + (item.usd_income || 0), 0)

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

      {/* Cards */}
      
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Airdrops"
          value={
            loadingFree || loadingPaid || loadingEnded
              ? <LoadingText />
              : totalAllTime
          }
          icon={<Gift />}
        />

        <StatCard
          title="Active Airdrops"
          value={loadingFree || loadingPaid || loadingEnded ? 'Loading...' : totalActive}
          icon={<Rocket />}
        />

        <StatCard
          title="Total Airdrops Ended"
          value={loadingEnded ? <LoadingText /> : totalEnded}
          icon={<TimerOff />}
        />

        <StatCard
          title="Total USD Income"
          value={
            loadingFree || loadingPaid || loadingEnded
              ? <LoadingText />
              : `$${totalUsdIncome.toLocaleString()}`
          }
          icon={<DollarSign />}
        />
      </section>
    </div>
  )
}