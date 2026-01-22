import { get, post, patch, del } from './api'

export function getCategories() {
  return get('/menu-categories')
}

export function createCategory(data: {
  MenuCategoryName: string
}) {
  return post('/menu-categories', data)
}

export function updateCategory(
  categoryId: number,
  data: any
) {
  return patch(`/menu-categories/${categoryId}`, data)
}

export function deleteCategory(categoryId: number) {
  return del(`/menu-categories/${categoryId}`)
}
