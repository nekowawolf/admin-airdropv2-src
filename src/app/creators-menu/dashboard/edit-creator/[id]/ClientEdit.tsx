'use client'

import EditCreatorForm from '@/components/creators/EditCreatorForm'
import { useParams } from 'next/navigation'

export default function ClientEdit() {
  const params = useParams()
  const id = params.id as string

  return (
    <div>
      <EditCreatorForm id={id} />
    </div>
  )
}