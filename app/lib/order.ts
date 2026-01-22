import { get, post, patch, del } from './api'

export function getOrders() {
  return get('/orders')
}

export function getOrder(id: number) {
  return get(`/orders/${id}`)
}

export function getOrdersByTable(tableId: number) {
  return get(`/orders/table/${tableId}`)
}

export function createOrder(data: {
  TableID: number
}) {
  return post('/orders', data)
}

export function updateOrder(id: number, data: any) {
  return patch(`/orders/${id}`, data)
}

export function deleteOrder(id: number) {
  return del(`/orders/${id}`)
}
