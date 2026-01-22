'use client'

import { useEffect, useState } from 'react'
import { get, post, del } from '@/app/lib/api'

export default function UsersPage() {
  const [userList, setUserList] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const [userForm, setUserForm] = useState({
    UserName: '',
    Password: '',
    UserRole: 'waiter'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await get('/users')

    if (response && !response.error && response.data) {
      setUserList(response.data)
    }
  }

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault()

    const response = await post('/users', {
      UserName: userForm.UserName,
      Password: userForm.Password,
      UserRole: userForm.UserRole
    })

    if (response && !response.error) {
      setModalOpen(false)
      setUserForm({
        UserName: '',
        Password: '',
        UserRole: 'waiter'
      })
      fetchUsers()
    } else {
      alert(response?.message || 'Could not create user')
    }
  }

  const deleteUser = async (userId: number) => {
    const confirmed = window.confirm('Delete user?')
    if (!confirmed) return

    const response = await del(`/users/${userId}`)

    if (!response?.error) {
      fetchUsers()
    } else {
      alert('Delete failed')
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users Management</h2>

        <button
          className="btn btn-primary"
          onClick={() => setModalOpen(true)}
        >
          Add User
        </button>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {userList.length > 0 ? (
                userList.map(user => (
                  <tr key={user.UserID}>
                    <td>{user.UserID}</td>
                    <td>{user.UserName}</td>
                    <td>{user.UserRole}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteUser(user.UserID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-muted"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            className="bg-white p-4 rounded"
            style={{ width: 400 }}
          >
            <h5 className="mb-3">Add User</h5>

            <form onSubmit={createUser}>
              <input
                className="form-control mb-2"
                placeholder="Username"
                value={userForm.UserName}
                onChange={e =>
                  setUserForm({
                    ...userForm,
                    UserName: e.target.value
                  })
                }
              />

              <input
                type="password"
                className="form-control mb-2"
                placeholder="Password"
                value={userForm.Password}
                onChange={e =>
                  setUserForm({
                    ...userForm,
                    Password: e.target.value
                  })
                }
              />

              <select
                className="form-control mb-3"
                value={userForm.UserRole}
                onChange={e =>
                  setUserForm({
                    ...userForm,
                    UserRole: e.target.value
                  })
                }
              >
                <option value="waiter">Waiter</option>
                <option value="chef">Chef</option>
                <option value="cashier">Cashier</option>
              </select>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
