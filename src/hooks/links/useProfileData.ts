import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '@/services/links/linkService'
import { Profile } from '@/types/link'
import { toast } from 'sonner'

export function useProfileData() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await getProfile()
      setProfile(data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (data: Profile) => {
    try {
      setSaving(true)
      await updateProfile(data)
      setProfile(data)
      toast.success('Profile updated successfully')
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile')
      throw err
    } finally {
      setSaving(false)
    }
  }

  return { profile, loading, saving, error, handleUpdate }
}