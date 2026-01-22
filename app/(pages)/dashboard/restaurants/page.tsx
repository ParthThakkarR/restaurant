'use client'

import { useEffect, useState } from 'react'
import { get, post, patch } from '@/app/lib/api'

export default function RestaurantsPage() {
  const [restaurantData, setRestaurantData] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [restaurantForm, setRestaurantForm] = useState({
    RestaurantName: '',
    RestaurantAddress: '',
    RestaurantPhone: ''
  })

  useEffect(() => {
    fetchRestaurant()
  }, [])

  const fetchRestaurant = async () => {
    const response = await get('/restaurants')

    if (response && !response.error && response.data) {
      setRestaurantData(response.data)
    } else {
      setRestaurantData(null)
    }
  }

  const saveRestaurant = async (event: React.FormEvent) => {
    event.preventDefault()

    let response

    if (!restaurantData || !restaurantData.RestaurantID) {
      response = await post('/restaurants', {
        RestaurantName: restaurantForm.RestaurantName,
        RestaurantAddress: restaurantForm.RestaurantAddress,
        RestaurantPhone: restaurantForm.RestaurantPhone
      })
    } else {
      response = await patch(
        `/restaurants/${restaurantData.RestaurantID}`,
        {
          RestaurantName: restaurantForm.RestaurantName,
          RestaurantAddress: restaurantForm.RestaurantAddress,
          RestaurantPhone: restaurantForm.RestaurantPhone
        }
      )
    }

    if (response && !response.error) {
      setModalOpen(false)
      fetchRestaurant()
    } else {
      alert(response?.message || 'Operation failed')
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Restaurants Management</h2>

        <button
          className="btn btn-primary"
          onClick={() => setModalOpen(true)}
        >
          {restaurantData?.RestaurantID
            ? 'Edit Restaurant'
            : 'Add Restaurant'}
        </button>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {restaurantData?.RestaurantID ? (
                <tr>
                  <td>{restaurantData.RestaurantID}</td>
                  <td>{restaurantData.RestaurantName}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setModalOpen(true)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center text-muted"
                  >
                    No restaurant created
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
            <h5 className="mb-3">
              {restaurantData?.RestaurantID
                ? 'Edit Restaurant'
                : 'Add Restaurant'}
            </h5>

            <form onSubmit={saveRestaurant}>
              <input
                className="form-control mb-2"
                placeholder="Restaurant Name"
                value={restaurantForm.RestaurantName}
                onChange={e =>
                  setRestaurantForm({
                    ...restaurantForm,
                    RestaurantName: e.target.value
                  })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Address"
                value={restaurantForm.RestaurantAddress}
                onChange={e =>
                  setRestaurantForm({
                    ...restaurantForm,
                    RestaurantAddress: e.target.value
                  })
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Phone"
                value={restaurantForm.RestaurantPhone}
                onChange={e =>
                  setRestaurantForm({
                    ...restaurantForm,
                    RestaurantPhone: e.target.value
                  })
                }
              />

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
