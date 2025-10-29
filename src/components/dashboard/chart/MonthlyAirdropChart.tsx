'use client'

import { useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { MonthlyAirdropData } from '@/services/chartService'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface MonthlyAirdropChartProps {
  data: MonthlyAirdropData[]
  loading?: boolean
  height?: number
}

export default function MonthlyAirdropChart({
  data,
  loading,
  height = 300,
}: MonthlyAirdropChartProps) {
  const chartRef = useRef<any>(null)

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: `${height}px` }}>
        <Spinner variant="ellipsis" size={30} />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center text-muted-foreground" style={{ height: `${height}px` }}>
        No monthly airdrop data available
      </div>
    )
  }

  const chartData: ChartData<'line'> = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Free Airdrops',
        data: data.map(item => item.free),
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Paid Airdrops',
        data: data.map(item => item.paid),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Ended Airdrops',
        data: data.map(item => item.ended),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.1,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Airdrop Overview',
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }

  return (
    <div className="w-full relative">
      <div style={{ height: `${height}px` }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}