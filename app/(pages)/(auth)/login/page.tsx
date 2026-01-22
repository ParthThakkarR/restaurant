'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/lib/auth'

export default function LoginPage() {
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    UserName: '',
    Password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState('')

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    setLoginError('')

    let result
    try {
      result = await login(loginData)
    } catch {
      setLoginError('Server not responding')
      setIsSubmitting(false)
      return
    }

    if (!result || result.error) {
      setLoginError(result?.message || 'Invalid username or password')
      setIsSubmitting(false)
      return
    }

    const authToken = result.data.token
    localStorage.setItem('token', authToken)

    router.push('/dashboard/restaurants')
  }

  return (
    <>
      <h1 className="text-center mt-4">KHANA KHA K JANA</h1>

      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">

            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="login illustration"
              />
            </div>

            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={submitLogin}>

                <p className="lead fw-normal mb-3">Sign in</p>

                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={loginData.UserName}
                    onChange={e =>
                      setLoginData({
                        ...loginData,
                        UserName: e.target.value
                      })
                    }
                  />
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={loginData.Password}
                    onChange={e =>
                      setLoginData({
                        ...loginData,
                        Password: e.target.value
                      })
                    }
                  />
                </div>

                {loginError && (
                  <div className="text-danger mb-2">
                    {loginError}
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
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
