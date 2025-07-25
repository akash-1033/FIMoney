"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useProducts } from "../context/ProductContext"
import { ArrowLeft, Save } from "lucide-react"

const EditProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    category: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const { getProductById, updateProduct } = useProducts()
  const [access_token, setAccessToken] = useState(null);
  useEffect(() => {
    setAccessToken(localStorage.getItem("token"));
  }, [])
  const navigate = useNavigate()

  const categories = ["Electronics", "Kitchen", "Office", "Clothing", "Books", "Other"]

  useEffect(() => {
    const existingProduct = getProductById(id)
    if (existingProduct) {
      setProduct({
        name: existingProduct.name,
        sku: existingProduct.sku,
        quantity: existingProduct.quantity.toString(),
        price: existingProduct.price.toString(),
        category: existingProduct.category,
      })
    } else {
      navigate("/products");
    }
    setLoading(false)
  }, [id, getProductById, navigate])

  const validateForm = () => {
    const newErrors = {}

    if (!product.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!product.sku.trim()) {
      newErrors.sku = "SKU is required"
    }

    if (!product.quantity || product.quantity < 0) {
      newErrors.quantity = "Valid quantity is required"
    }

    if (!product.price || product.price <= 0) {
      newErrors.price = "Valid price is required"
    }

    if (!product.category) {
      newErrors.category = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      updateProduct(id, {
        ...product,
        quantity: Number.parseInt(product.quantity),
        price: Number.parseFloat(product.price),
      })
    }
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${id}/quantity/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      },
      body: JSON.stringify({ quantity: Number.parseInt(product.quantity) })
    });
    const data = await response.json();
    console.log(data);
    navigate("/products")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/products")}
          className="text-gray-600 hover:text-gray-800 transition duration-200"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product information</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                disabled
                value={product.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.quantity ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Enter quantity"
              />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
            </div>

          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center space-x-2 transition duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Update Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
