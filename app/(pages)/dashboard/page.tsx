'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

export default function DashboardPage() {
  const { role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (role === 'manager') {
      router.replace('/dashboard')
    }
  }, [role])

  return <p>HIII</p>
}
