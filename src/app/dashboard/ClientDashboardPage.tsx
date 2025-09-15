'use client'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useAirdropData } from '@/hooks/useAirdropData'
import { useAirdropEndedData } from '@/hooks/useAirdropEndedData'
import StatCard from '@/components/dashboard/chart/StatCard'
import BackerChart from '@/components/dashboard/chart/BackerChart'
import MonthlyAirdropChart from '@/components/dashboard/chart/MonthlyAirdropChart'
import ProjectMetricsChart from '@/components/dashboard/chart/ProjectMetricsChart'
import { Gift, TimerOff, DollarSign, Rocket, Users, BarChart3, TrendingUp } from 'lucide-react'
import { useBackerData, useMonthlyAirdropData, useProjectMetrics } from '@/hooks/useChartData'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { useState } from 'react'

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
  const { data: projectMetrics, loading: loadingMetrics } = useProjectMetrics()
  
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const { data: monthlyData, loading: loadingMonthly } = useMonthlyAirdropData(selectedYear)

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

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year)
  }

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

      {/* Charts Section */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Backer Chart */}
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

        {/* Monthly Airdrop Chart */}
        <div className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={20} className="text-green-500" />
            <h3 className="text-lg font-semibold text-primary">Monthly Airdrop Activity</h3>
          </div>
          <div className="h-64 md:h-72">
            <MonthlyAirdropChart 
              data={monthlyData} 
              loading={loadingMonthly} 
              height={256}
              onYearChange={handleYearChange}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {selectedYear 
              ? `Showing data for year ${selectedYear}` 
              : 'Showing all data (use filter to select specific year)'}
          </p>
        </div>
      </section>

      {/* Top Funding & Income Chart */}
      <section className="p-4 rounded-2xl shadow-md bg-[var(--fill-color)] border border-border-divider">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-purple-500" />
          <h3 className="text-lg font-semibold text-primary">Top Projects by Funding & Income</h3>
        </div>
        <div className="h-96">
          <ProjectMetricsChart 
            data={projectMetrics} 
            loading={loadingMetrics} 
            height={384}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Shows top projects by income with funding details and backer count
        </p>
      </section>


      {/* Recent Activity */}
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
          {(!endedData || endedData.length === 0) && (
            <div className="text-center text-muted-foreground py-4">
              No recent activity
            </div>
          )}
        </div>
      </section>
    </div>
  )
}