"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../context/ProductContext"
import { ArrowLeft, Save } from "lucide-react"

const AddProduct = () => {
  const [access_token, setAccessToken] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    type: "",
    description: "",
    imgae_url: "",
  })
  const [errors, setErrors] = useState({})
  const { addProduct } = useProducts()
  const navigate = useNavigate()
  useEffect(() => {
    setAccessToken(localStorage.getItem("token"));
  },[])
  const categories = ["Electronics", "Kitchen", "Office", "Clothing", "Books", "Other"]

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

    if (!product.type) {
      newErrors.type = "type is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      addProduct({
        ...product,
        quantity: Number.parseInt(product.quantity),
        price: Number.parseFloat(product.price),
      })
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify({ ...product }),
      });
      const data = await response.json();
      console.log(data);
      navigate("/products")
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
          <p className="text-gray-600">Create a new product record</p>
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
                value={product.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Enter product description"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                image_url *
              </label>
              <input
                type="text"
                id="image_url"
                name="image_url"
                value={product.image_url}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.image_url ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Enter image url"
              />
              {errors.image_url && <p className="mt-1 text-sm text-red-600">{errors.image_url}</p>}
            </div>

            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.sku ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Enter SKU"
              />
              {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
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

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
                placeholder="Enter price"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                type *
              </label>
              <select
                id="type"
                name="type"
                value={product.type}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.type ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                  }`}
              >
                <option value="">Select a type</option>
                {categories.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
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
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
