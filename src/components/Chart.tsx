'use client'

import { useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { BackerData } from '@/services/chartService'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BackerChartProps {
  data: BackerData[]
  loading?: boolean
  title?: string
  height?: number
}

export default function BackerChart({ data, loading, title = 'Top Backers by Number of Projects', height = 300 }: BackerChartProps) {
  const chartRef = useRef<any>(null)

  const chartData: ChartData<'bar'> = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Number of Projects',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 14
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 10
          }
        }
      }
    },
  }

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
        No backer data available
      </div>
    )
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  )
}