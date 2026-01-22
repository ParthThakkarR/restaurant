export function getRoleFromToken() {
  if (typeof window === 'undefined') return null

  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload?.data?.UserRole || null
  } catch (err) {
    return null
  }
}

export function getRestaurantIdFromToken() {
  if (typeof window === 'undefined') return null

  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload?.data?.RestaurantID || null
  } catch {
    return null
  }
}
