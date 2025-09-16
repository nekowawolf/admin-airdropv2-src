'use client'

import { useRef, useState, useEffect } from 'react'
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
import { IoIosArrowUp } from "react-icons/io"

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

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  id: string
  name: string
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  required?: boolean
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        id={`${id}-button`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-card-color2 border border-border-divider rounded-lg px-4 py-3 text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-between"
      >
        <span className={value ? "text-primary" : "text-muted"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IoIosArrowUp 
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-0' : 'transform rotate-180'
          }`}
        />
      </button>

      <div 
        id={id}
        className={`z-10 absolute top-full left-0 right-0 mt-1 dropdown-bg divide-y divide-border-divider rounded-lg shadow-sm border border-border-divider ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="py-2 text-sm text-primary" aria-labelledby={`${id}-button`}>
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 hover:hover-bg ${
                  value === option.value ? 'hover-bg-accent text-accent' : ''
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />
    </div>
  )
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
  const yearOptions = Array.from({ length: currentYear - 2022 }, (_, i) => currentYear - i)

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

  const handleYearSelect = (year: string) => {
    if (year === "") {
      setSelectedYear(null)
    } else {
      setSelectedYear(parseInt(year))
    }
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

  const yearDropdownOptions: DropdownOption[] = [
    { value: "", label: "All" },
    ...yearOptions.map(year => ({ value: year.toString(), label: year.toString() }))
  ]

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
        <div className="absolute top-12 right-0 z-20 bg-[var(--dropdown-bg)] border border-border-divider rounded-lg p-4 shadow-lg w-64">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} />
            <h4 className="font-medium">Filter by Year</h4>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm block mb-1">Select Year</label>
            <CustomDropdown
              id="year-filter"
              name="year"
              value={selectedYear?.toString() || ""}
              onChange={handleYearSelect}
              options={yearDropdownOptions}
              placeholder="Select year"
            />
          </div>
          
          <div className="flex gap-2 pt-4 border-t border-border-divider mt-4">
            <button
              onClick={handleApplyFilter}
              className="flex-1 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Apply
            </button>
            <button
              onClick={handleClearFilter}
              className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400"
            >
              Clear
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