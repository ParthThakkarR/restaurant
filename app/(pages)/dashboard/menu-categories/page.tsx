'use client'

import { useEffect, useState } from 'react'
import { get, post, del } from '@/app/lib/api'
import { useAuth } from '@/app/context/AuthContext'

export default function MenuCategoriesPage() {
  const { role } = useAuth()

  const [categories, setCategories] = useState<any[]>([])
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const response = await get('/menu-categories')

    if (response && !response.error) {
      setCategories(response.data ?? [])
    }
  }

  const createCategory = async () => {
    if (!categoryName.trim()) return

    const response = await post('/menu-categories', {
      MenuCategoryName: categoryName
    })

    if (response && !response.error) {
      setCategoryName('')
      fetchCategories()
    }
  }

  const deleteCategory = async (categoryId: number) => {
    const confirmed = window.confirm('Delete category?')
    if (!confirmed) return

    await del(`/menu-categories/${categoryId}`)
    fetchCategories()
  }

  if (role !== 'manager') {
    return <p>Access denied</p>
  }

  return (
    <>
      <h3>Menu Categories</h3>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Category name"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={createCategory}
        >
          Add
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map(category => (
            <tr key={category.MenuCategoryID}>
              <td>{category.MenuCategoryID}</td>
              <td>{category.MenuCategoryName}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    deleteCategory(category.MenuCategoryID)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
