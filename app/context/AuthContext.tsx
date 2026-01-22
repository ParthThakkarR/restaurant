'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRoleFromToken } from '@/app/lib/token'

type AuthContextType = {
  token: string | null
  role: string | null
  loginUser: (token: string) => void
  logoutUser: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) {
      setToken(t)
      setRole(getRoleFromToken())
    }
  }, [])

  function loginUser(newToken: string) {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setRole(getRoleFromToken())
  }

  function logoutUser() {
    localStorage.removeItem('token')
    setToken(null)
    setRole(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{ token, role, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
