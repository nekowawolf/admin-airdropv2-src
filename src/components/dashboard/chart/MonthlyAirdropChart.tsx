'use client'

import { useRef, useState } from 'react'
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
  ChartOptions
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { MonthlyAirdropData } from '@/services/chartService'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { Calendar, Filter, ChevronDown } from 'lucide-react'

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
  title?: string
  height?: number
  onYearChange?: (year: number | null) => void
}

export default function MonthlyAirdropChart({ 
  data, 
  loading, 
  title = 'Monthly Airdrop Activity', 
  height = 300,
  onYearChange
}: MonthlyAirdropChartProps) {
  const chartRef = useRef<any>(null)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | null>(new Date().getFullYear())

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i)

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
    },
  }

  const handleApplyFilter = () => {
    if (onYearChange) {
      onYearChange(selectedYear)
    }
    setShowFilter(false)
  }

  const handleClearFilter = () => {
    setSelectedYear(null)
    if (onYearChange) onYearChange(null)
    setShowFilter(false)
  }

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
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
        No monthly airdrop data available
      </div>
    )
  }

  return (
    <div className="w-full relative">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 rounded-lg bg-[var(--hover-bg)] border border-border-divider hover:bg-[var(--button-hover)] flex items-center gap-1"
          title="Filter by year"
        >
          <Filter size={16} />
          <ChevronDown size={14} />
        </button>
      </div>

      {showFilter && (
        <div className="absolute top-10 right-0 z-20 bg-[var(--dropdown-bg)] border border-border-divider rounded-lg p-4 shadow-lg w-64">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} />
            <h4 className="font-medium">Filter by Year</h4>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm block mb-1">Select Year</label>
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
              {yearOptions.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={`p-2 text-sm rounded-md border ${
                    selectedYear === year
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-[var(--hover-bg)] border-border-divider hover:bg-[var(--button-hover)]'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4 border-t border-border-divider mt-4">
            <button
              onClick={handleClearFilter}
              className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilter}
              className="flex-1 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <div style={{ height: `${height}px` }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}