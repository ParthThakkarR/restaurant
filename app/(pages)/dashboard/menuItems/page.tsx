'use client'

import { useEffect, useState } from 'react'
import { get, post, del } from '@/app/lib/api'
import { useAuth } from '@/app/context/AuthContext'

export default function MenuItemsPage() {
  const { role } = useAuth()

  const [menuItems, setMenuItems] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  const [itemForm, setItemForm] = useState({
    MenuItemName: '',
    MenuItemPrice: '',
    MenuCategoryID: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const itemsResponse = await get('/menu-items')
    const categoriesResponse = await get('/menu-categories')

    if (itemsResponse && !itemsResponse.error) {
      setMenuItems(itemsResponse.data ?? [])
    }

    if (categoriesResponse && !categoriesResponse.error) {
      setCategories(categoriesResponse.data ?? [])
    }
  }

  const createItem = async () => {
    if (
      !itemForm.MenuItemName.trim() ||
      !itemForm.MenuItemPrice ||
      !itemForm.MenuCategoryID
    ) {
      return
    }

    const response = await post('/menu-items', {
      MenuItemName: itemForm.MenuItemName,
      MenuItemPrice: Number(itemForm.MenuItemPrice),
      MenuCategoryID: Number(itemForm.MenuCategoryID)
    })

    if (response && !response.error) {
      setItemForm({
        MenuItemName: '',
        MenuItemPrice: '',
        MenuCategoryID: ''
      })
      fetchData()
    }
  }

  const deleteItem = async (itemId: number) => {
    const confirmed = window.confirm('Delete item?')
    if (!confirmed) return

    await del(`/menu-items/${itemId}`)
    fetchData()
  }

  if (role !== 'manager') {
    return <p>Access denied</p>
  }

  return (
    <>
      <h3>Menu Items</h3>

      <div className="row g-2 mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Item name"
            value={itemForm.MenuItemName}
            onChange={e =>
              setItemForm({
                ...itemForm,
                MenuItemName: e.target.value
              })
            }
          />
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Price"
            value={itemForm.MenuItemPrice}
            onChange={e =>
              setItemForm({
                ...itemForm,
                MenuItemPrice: e.target.value
              })
            }
          />
        </div>

        <div className="col">
          <select
            className="form-control"
            value={itemForm.MenuCategoryID}
            onChange={e =>
              setItemForm({
                ...itemForm,
                MenuCategoryID: e.target.value
              })
            }
          >
            <option value="">Category</option>
            {categories.map(category => (
              <option
                key={category.MenuCategoryID}
                value={category.MenuCategoryID}
              >
                {category.MenuCategoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          <button
            className="btn btn-primary w-100"
            onClick={createItem}
          >
            Add
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {menuItems.map(item => (
            <tr key={item.MenuItemID}>
              <td>{item.MenuItemID}</td>
              <td>{item.MenuItemName}</td>
              <td>{item.MenuItemPrice}</td>
              <td>{item.MenuCategory?.MenuCategoryName}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() =>
                    deleteItem(item.MenuItemID)
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
