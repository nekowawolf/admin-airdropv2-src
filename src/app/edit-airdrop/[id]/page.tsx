'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAirdropFreeById } from '@/services/airdropService'
import EditAirdropForm from '@/components/EditAirdropForm'
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { toast } from 'sonner'

export default function EditAirdropPage() {
  const params = useParams()
  const router = useRouter()
  const [airdropData, setAirdropData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const id = params.id as string

  useEffect(() => {
    const fetchAirdropData = async () => {
      try {
        setLoading(true)
        const airdrop = await getAirdropFreeById(id)
        setAirdropData(airdrop)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch airdrop data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAirdropData()
    }
  }, [id])

  const handleSuccess = () => {
    toast.success('Airdrop updated successfully!')
    router.push('/dashboard/airdrop-free')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner variant="circle" size={40} className="text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary mb-2">Error</h2>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard/airdrop-free')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!airdropData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary mb-2">Airdrop Not Found</h2>
          <p className="text-secondary mb-4">The airdrop you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard/airdrop-free')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <EditAirdropForm airdropData={airdropData} onSuccess={handleSuccess} />
    </div>
  )
}
