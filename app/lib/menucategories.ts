import { get, post, patch, del } from './api'

export function getCategories() {
  return get('/menu-categories')
}

export function createCategory(data: {
  MenuCategoryName: string
}) {
  return post('/menu-categories', data)
}

export function updateCategory(id: number, data: any) {
  return patch(`/menu-categories/${id}`, data)
}

export function deleteCategory(id: number) {
  return del(`/menu-categories/${id}`)
}
