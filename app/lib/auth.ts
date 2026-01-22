import { post } from './api'

export async function login(data: {
  UserName: string
  Password: string
}) {
  return post('/users/login', data)
}

export async function signup(data: {
  UserName: string
  Password: string
  UserRole: string
  RestaurantID: number
}) {
  return post('/users/signup', data)
}
