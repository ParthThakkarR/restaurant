'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role, logoutUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (role && role !== 'manager') {
      router.replace('/unauthorized')
    }
  }, [role])

  if (!role) return null
  if (role !== 'manager') return null

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand mb-0 h5">DineFlow POS</span>
        <span className="text-white">Manager</span>
      </nav>

      <div className="container-fluid">
        <div className="row">

          {/* Sidebar */}
          <div className="col-2 sidebar p-3 border-end" style={{ minHeight: '100vh' }}>
            <ul className="nav flex-column">

              <li className="nav-item">
                <a className="nav-link active" href="/dashboard/restaurants">
                  <i className="bi bi-shop me-2"></i>Restaurants
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/dashboard/users">
                  <i className="bi bi-people me-2"></i>Users
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/dashboard/tables">
                  <i className="bi bi-table me-2"></i>Tables
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/dashboard/menu-categories">
                  <i className="bi bi-tags me-2"></i>Menu Categories
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/dashboard/menu-items">
                  <i className="bi bi-list-ul me-2"></i>Menu Items
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/dashboard/orders">
                  <i className="bi bi-receipt me-2"></i>Orders
                </a>
              </li>

              <li className="nav-item mt-4">
                <button
                  className="nav-link text-danger btn btn-link p-0"
                  onClick={logoutUser}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>

            </ul>
          </div>

          {/* Content */}
          <div className="col-10 p-4">
            {children}
          </div>

        </div>
      </div>
    </>
  )
}
