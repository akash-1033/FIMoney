"use client"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Package, Settings, Users, ShoppingCart } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()

  const navigation = [
    { name: "Products", href: "/products", icon: Package },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4">
        <ShoppingCart className="w-8 h-8" />
        <span className="text-2xl font-extrabold">Inventory</span>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-2 py-2 px-4 rounded transition duration-200 ${isActive(item.href) ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
