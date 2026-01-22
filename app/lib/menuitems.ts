import { get, post, patch, del } from './api'

export function getItemsByCategory(categoryId: number) {
  return get(`/menu-items/category/${categoryId}`)
}

export function createItem(data: {
  MenuItemName: string
  MenuItemPrice: number
  MenuCategoryID: number
}) {
  return post('/menu-items', data)
}

export function updateItem(id: number, data: any) {
  return patch(`/menu-items/${id}`, data)
}

export function deleteItem(id: number) {
  return del(`/menu-items/${id}`)
}
