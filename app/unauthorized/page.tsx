'use client'

import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2>Access Denied</h2>
      <p>You do not have permission to view this page.</p>
      <button className="btn btn-primary" onClick={() => router.push('/dashboard')}>
        Go Back
      </button>
    </div>
  )
}
