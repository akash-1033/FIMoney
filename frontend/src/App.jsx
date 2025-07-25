import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route
              path="/products"
              element={
                <div className="flex h-screen bg-gray-100">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <TopBar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                      <Products />
                    </main>
                  </div>
                </div>
              }
            />
            <Route
              path="/products/:id/edit"
              element={
                <div className="flex h-screen bg-gray-100">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <TopBar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                      <EditProduct />
                    </main>
                  </div>
                </div>
              }
            />
            <Route
              path="/products/new"
              element={
                <div className="flex h-screen bg-gray-100">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <TopBar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                      <AddProduct />
                    </main>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
