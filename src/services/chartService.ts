import { getAirdropEnded } from './endedService'

export interface BackerData {
  name: string
  count: number
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