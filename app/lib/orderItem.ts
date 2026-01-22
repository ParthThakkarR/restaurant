import { get, post, patch, del } from './api'

export function getOrderItems(orderId: number) {
  return get(`/order-items/order/${orderId}`)
}

export function createOrderItem(data: {
  OrderID: number
  MenuItemID: number
  Quantity?: number
}) {
  return post('/order-items', data)
}

export function updateOrderItem(id: number, data: any) {
  return patch(`/order-items/${id}`, data)
}

export function deleteOrderItem(id: number) {
  return del(`/order-items/${id}`)
}
