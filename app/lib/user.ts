import { get, post, del, patch } from './api'

export function getUsers() {
  return get('/users')
}

export function create(data: {
  UserName: string
  Password: string
  UserRole: string
}) {
  return post('/users', data)
}

export function update(
  id: number,
  data: {
    UserName?: string
    UserRole?: string
  }
) {
  return patch(`/users/${id}`, data)
}

export function updatePassword(id: number, Password: string) {
  return post(`/users/updatePassword/${id}`, { Password })
}

export function deleteUser(id: number) {
  return del(`/users/${id}`)
}
