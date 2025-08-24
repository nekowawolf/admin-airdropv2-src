import { useState } from 'react'
import { toast } from 'sonner'
import { createAirdropFree, createAirdropPaid } from '@/services/airdropService'
import { AirdropFormData } from '@/types/airdrop'

export function useAddAirdrop() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const submitAirdrop = async (data: AirdropFormData, type: 'free' | 'paid') => {
    setIsSubmitting(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const price = parseFloat(data.price)
      const usdIncome = parseInt(data.usd_income)

      if (isNaN(price) || isNaN(usdIncome)) {
        throw new Error('Price and USD Income must be valid numbers')
      }

      const apiData = {
        name: data.name,
        task: data.task,
        link: data.link,
        level: data.level,
        status: data.status,
        backed: data.backed,
        funds: data.funds,
        supply: data.supply,
        market_cap: data.market_cap,
        vesting: data.vesting,
        link_claim: data.claim,
        price: price,
        usd_income: usdIncome,
      }

      if (type === 'free') {
        await createAirdropFree(apiData)
        toast.success('Free airdrop created successfully!')
        setSuccessMessage('Free airdrop created successfully!')
      } else {
        await createAirdropPaid(apiData)
        toast.success('Paid airdrop created successfully!')
        setSuccessMessage('Paid airdrop created successfully!')
      }
    } catch (err: any) {
      console.error('Error creating airdrop:', err)
      const errorMsg = err.message || 'Failed to create airdrop. Please try again.'
      setErrorMessage(errorMsg)
      toast.error(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, successMessage, errorMessage, submitAirdrop }
}