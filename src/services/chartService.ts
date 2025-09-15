import { getAirdropEnded } from './endedService'
import { getAirdropFree } from './freeService'
import { getAirdropPaid } from './paidService'

export interface BackerData {
  name: string
  count: number
}

export interface MonthlyAirdropData {
  month: string
  free: number
  paid: number
  ended: number
}

export interface ProjectMetric {
  name: string
  funding: number
  backed: string
  income: number
}

export const getBackerStats = async (): Promise<BackerData[]> => {
  try {
    const endedData = await getAirdropEnded()
    
    const backerCount: Record<string, number> = {}
    
    endedData.forEach((item: any) => {
      if (item.backed) {
        const backers = item.backed.split(',').map((backer: string) => backer.trim())
        
        backers.forEach((backer: string) => {
          if (backer) {
            backerCount[backer] = (backerCount[backer] || 0) + 1
          }
        })
      }
    })

    return Object.entries(backerCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  } catch (error) {
    console.error('Failed to fetch backer stats:', error)
    return []
  }
}

export const getMonthlyAirdropStatsByYear = async (year?: number): Promise<MonthlyAirdropData[]> => {
  try {
    const [freeData, paidData, endedData] = await Promise.all([
      getAirdropFree(),
      getAirdropPaid(),
      getAirdropEnded()
    ])

    const allData = [
      ...freeData.map((item: any) => ({ ...item, type: 'free' })),
      ...paidData.map((item: any) => ({ ...item, type: 'paid' })),
      ...endedData.map((item: any) => ({ ...item, type: 'ended' }))
    ]

    let filteredData = allData
    if (year) {
      filteredData = allData.filter((item: any) => {
        const createdAt = new Date(item.created_at || item.ended_at || new Date())
        return createdAt.getFullYear() === year
      })
    }

    const monthlyMap = new Map<string, MonthlyAirdropData>()

    filteredData.forEach((item: any) => {
      const date = new Date(item.created_at || item.ended_at || new Date())
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, {
          month: monthName,
          free: 0,
          paid: 0,
          ended: 0
        })
      }
      
      const monthlyData = monthlyMap.get(monthKey)!
      if (item.type === 'free') {
        monthlyData.free += 1
      } else if (item.type === 'paid') {
        monthlyData.paid += 1
      } else if (item.type === 'ended') {
        monthlyData.ended += 1
      }
    })

    return Array.from(monthlyMap.values())
      .sort((a, b) => {
        const aMatch = a.month.match(/([A-Za-z]{3}) (\d{4})/)
        const bMatch = b.month.match(/([A-Za-z]{3}) (\d{4})/)
        
        if (!aMatch || !bMatch) return 0
        
        const aMonth = aMatch[1]
        const aYear = parseInt(aMatch[2])
        const bMonth = bMatch[1]
        const bYear = parseInt(bMatch[2])
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        if (aYear !== bYear) return aYear - bYear
        return monthNames.indexOf(aMonth) - monthNames.indexOf(bMonth)
      })
  } catch (error) {
    console.error('Failed to fetch monthly airdrop stats by year:', error)
    return []
  }
}

export const getProjectMetrics = async (): Promise<ProjectMetric[]> => {
  try {
    const [ endedData] = await Promise.all([
      getAirdropEnded()
    ])

    const allData = [
      ...endedData
    ].filter(item => item.status === 'ended')

    return allData
      .filter(item => item && item.name)
      .map(item => {
        let fundingValue = 0;
        if (item.funds) {
          if (item.funds.includes('M')) {
            fundingValue = parseFloat(item.funds.replace('M', '')) * 1000000;
          } else if (item.funds.includes('K')) {
            fundingValue = parseFloat(item.funds.replace('K', '')) * 1000;
          } else {
            fundingValue = parseFloat(item.funds) || 0;
          }
        }

        return {
          name: item.name,
          funding: fundingValue,
          backed: item.backed || 'Unknown',
          income: parseFloat(item.usd_income?.toString() || '0') || 0
        }
      })
      .sort((a, b) => b.income - a.income)
      .slice(0, 10) 
  } catch (error) {
    console.error('Failed to fetch project metrics:', error)
    return []
  }
}