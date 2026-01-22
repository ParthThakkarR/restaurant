'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/lib/auth'

export default function LoginPage() {
  const [form, setForm] = useState({
    UserName: '',
    Password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await login(form)

    if (res.error) {
      setError(res.message || 'login failed')
      setLoading(false)
      return
    }

    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
  }

  return (
    <>
    <h1 className="text-center mt-4">
      KHANA KHA K JANA
    </h1>
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">

          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="login"
            />
          </div>

          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

            <form onSubmit={handleSubmit}>

              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in</p>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {/* Username */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  value={form.UserName}
                  onChange={e =>
                    setForm({ ...form, UserName: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div className="form-outline mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={form.Password}
                  onChange={e =>
                    setForm({ ...form, Password: e.target.value })
                  }
                />
              </div>

              {error && (
                <p className="text-danger mb-2">{error}</p>
              )}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}
