'use client'

import EditNetForm from '@/components/net/EditNetForm'
import { useParams } from 'next/navigation'

export default function ClientEdit() {
  const params = useParams()
  const id = params.id as string

  return (
    <div>
      <EditNetForm id={id} />
    </div>
  )
}