import { get, post, patch, del } from './api'

export function Tables() {
  return get('/tables')
}

export function Table(id: number) {
  return get(`/tables/${id}`)
}

export function createTable(data: {
  TableNumber: number
  TableCapacity?: number
}) {
  return post('/tables', data)
}

export function updateTable(id: number, data: any) {
  return patch(`/tables/${id}`, data)
}

export function deleteTable(id: number) {
  return del(`/tables/${id}`)
}
