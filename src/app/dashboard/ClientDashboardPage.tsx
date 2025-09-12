'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useAirdropData } from '@/hooks/useAirdropData'
import { useAirdropEndedData } from '@/hooks/useAirdropEndedData'
import { useBackerData } from '@/hooks/useChartData'
import StatCard from '@/components/StatCard'
import BackerChart from '@/components/Chart'
import { Gift, TimerOff, DollarSign, Rocket, Users, TrendingUp, BarChart3 } from 'lucide-react'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

function LoadingText() {
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Spinner variant="ellipsis" size={20} />
    </div>
  )
}

export default function ClientDashboardPage() {
  useAuthGuard()

  const { data: freeData, loading: loadingFree } = useAirdropData('free')
  const { data: paidData, loading: loadingPaid } = useAirdropData('paid')
  const { data: endedData, loading: loadingEnded } = useAirdropEndedData()
  const { data: backerData, loading: loadingBacker } = useBackerData()

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

      {/* Stats Cards */}
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
          value={loadingFree || loadingPaid || loadingEnded ?  <LoadingText /> : totalActive}
          icon={<Rocket />}
        />

        <StatCard
          title="Ended Airdrops "
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

      {/* Charts */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-primary">Backer Statistics</h3>
          </div>
          <div className="h-64 md:h-72">
            <BackerChart 
              data={backerData} 
              loading={loadingBacker} 
              height={256}
              title=""
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Shows the most active investors based on number of projects backed
          </p>
        </div>

        <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} className="text-green-500" />
            <h3 className="text-lg font-semibold text-primary">Airdrop Status Distribution</h3>
          </div>
          <div className="h-64 md:h-72 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
              <p>Additional chart coming soon</p>
              <p className="text-xs mt-1">You can add another chart here</p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
        <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {endedData && endedData.slice(0, 5).map((item, index) => (
            <div key={index} className="p-3 rounded-lg bg-[var(--hover-bg)] border border-border-divider">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Ended
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Backed by: {item.backed}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}