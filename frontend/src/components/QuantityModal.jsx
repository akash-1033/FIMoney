"use client"

import { useState } from "react"
import { useProducts } from "../context/ProductContext"
import { X, Package } from "lucide-react"

const QuantityModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const { updateProduct } = useProducts()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProduct(product.id, { quantity: Number.parseInt(quantity) })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Update Quantity
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition duration-200">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Product: {product.name}</p>
          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuantityModal
