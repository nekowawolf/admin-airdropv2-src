'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCommunityById } from '@/services/community/communityService'
import EditCommunityForm from '@/components/community/EditCommunityForm'
import { Spinner } from "@/components/ui/shadcn-io/spinner"
import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { toast } from 'sonner'

export default function EditCommunityClient() {
  useAuthGuard()

  const params = useParams()
  const router = useRouter()
  const [communityData, setCommunityData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const id = params.id as string

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true)
        const community = await getCommunityById(id)
        setCommunityData(community)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch community data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCommunityData()
    }
  }, [id])

  const handleSuccess = () => {
    toast.success('Community updated successfully!')
    router.push('/community-menu/dashboard/community-list')
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10 mt-36">
        <Spinner variant="circle" size={40} className="text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-center mt-24">
          <h2 className="text-xl font-semibold text-primary mb-2">Error</h2>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={() => router.push('/community-menu/dashboard/community-list')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:text-base text-sm"
          >
            Back to Communities
          </button>
        </div>
      </div>
    )
  }

  if (!communityData) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen">
        <div className="text-center mt-24">
          <h2 className="text-xl font-semibold text-primary mb-2">Community Not Found</h2>
          <p className="text-secondary mb-4 sm:text-base text-sm">The community you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/community-menu/dashboard/community-list')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg sm:text-base text-sm"
          >
            Back to Communities
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <EditCommunityForm
        communityData={communityData}
        onSuccess={handleSuccess}
      />
    </div>
  )
}