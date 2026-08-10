'use client'

import { useAuthGuard } from '@/hooks/auth-guard/useAuthGuard'
import { useRepoSubmissions } from '@/hooks/github-repos/useRepoSubmissions'
import RepoSubmissionsTable from '@/components/github-repos/RepoSubmissionsTable'

export default function ClientList() {
  useAuthGuard()
  const { data, loading, error, handleDelete } = useRepoSubmissions()

  return (
    <div>
      <RepoSubmissionsTable data={data} loading={loading} error={error} onDelete={handleDelete} />
    </div>
  )
}