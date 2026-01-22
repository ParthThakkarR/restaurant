import { get, del,post   } from './api'

export function getRestaurants() {
  return get('/restaurants')
}
export function createRestaurant(data: any) {
  return post('/restaurants', data)
}
export function deleteRestaurant(id: number) {
  return del(`/restaurants/${id}`)
}
