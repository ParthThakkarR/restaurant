'use client'

import { useEffect, useState } from 'react'
import { get, patch } from '@/app/lib/api'
import { useAuth } from '@/app/context/AuthContext'

export default function OrdersPage() {
  const { role } = useAuth()
  const [orderList, setOrderList] = useState<any[]>([])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const result = await get('/orders')

    if (result && !result.error) {
      setOrderList(result.data || [])
    }
  }

  const updateStatus = async (id: number, status: string) => {
    await patch(`/orders/${id}`, {
      OrderStatus: status
    })

    loadOrders()
  }

  return (
    <>
      <h3>Orders</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Table</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orderList.map(order => (
            <tr key={order.OrderID}>
              <td>{order.OrderID}</td>
              <td>{order.TableID}</td>
              <td>{order.OrderStatus}</td>
              <td>{order.TotalAmount}</td>
              <td className="d-flex gap-2">
                {role === 'chef' &&
                  order.OrderStatus === 'pending' && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        updateStatus(order.OrderID, 'preparing')
                      }
                    >
                      Prepare
                    </button>
                  )}

                {role === 'cashier' &&
                  order.OrderStatus === 'served' && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        updateStatus(order.OrderID, 'paid')
                      }
                    >
                      Mark Paid
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
