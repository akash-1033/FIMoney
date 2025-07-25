"use client"
import { LogOut, User } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useProducts} from '../context/ProductContext';
const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const {getProducts} = useProducts();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Get from localStorage
  useEffect(() => {
    getProducts();
    setUsername(localStorage.getItem("username"));
    setToken(localStorage.getItem("token"));
    setIsCheckingAuth(false); // done checking!
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (isCheckingAuth) return; // Don't redirect until checked!
    if (!username || !token) {
      setIsLoggedIn(false);
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [username, token, isCheckingAuth, navigate]);


  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">Inventory Management</h1>
        </div>

        {isLoggedIn && (<div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>)}
      </div>
    </header>
  )
}

export default TopBar
