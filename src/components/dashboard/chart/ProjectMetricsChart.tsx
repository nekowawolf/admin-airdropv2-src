import { useRef, useEffect } from 'react'
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend, Title)

interface ProjectMetric {
  name: string
  funding: number
  backed: string
  income: number
  created_at?: string  
  ended_at?: string   
}

interface ProjectMetricsChartProps {
  data: ProjectMetric[]
  loading: boolean
  height?: number
}

export default function ProjectMetricsChart({ data, loading, height = 300 }: ProjectMetricsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current || !data.length) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const projectDetails = data.map(item => ({
      name: item.name,
      backers: item.backed,
      funding: item.funding,
      income: item.income,
      created_at: item.created_at, 
      ended_at: item.ended_at  
    }))

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.name),
        datasets: [
          {
            label: 'Income (USD)',
            data: data.map(item => item.income),
            backgroundColor: 'rgba(79, 70, 229, 0.7)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: function(context) {
                const project = projectDetails[context[0].dataIndex]
                return project.name
              },
              label: function(context) {
                const project = projectDetails[context.dataIndex]
                const labels = [
                  `Income: $${project.income.toLocaleString()}`,
                  `Funding: $${project.funding.toLocaleString()}`,
                  `Backed: ${project.backers}`
                ]
                
                if (project.created_at) {
                  const createdDate = new Date(project.created_at)
                  const formattedCreated = `${createdDate.getDate().toString().padStart(2, '0')}/${(createdDate.getMonth() + 1).toString().padStart(2, '0')}/${createdDate.getFullYear()}`
                  labels.push(`Created: ${formattedCreated}`)
                }
                
                if (project.ended_at) {
                  const endedDate = new Date(project.ended_at)
                  const formattedEnded = `${endedDate.getDate().toString().padStart(2, '0')}/${(endedDate.getMonth() + 1).toString().padStart(2, '0')}/${endedDate.getFullYear()}`
                  labels.push(`Ended: ${formattedEnded}`)
                }
                
                return labels
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Income (USD)'
            },
            ticks: {
              callback: function(value) {
                const num = Number(value)
                if (num >= 1000000) {
                  return '$' + (num / 1000000).toFixed(1) + 'M'
                } else if (num >= 1000) {
                  return '$' + (num / 1000).toFixed(1) + 'K'
                }
                return '$' + num
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Projects'
            }
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner variant="ellipsis" size={32} />
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-full text-muted-foreground">
        No data available
      </div>
    )
  }

  return (
    <div style={{ height: `${height}px` }}>
      <canvas ref={chartRef} />
    </div>
  )
}
