import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/user/Profile";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Navbar from "./components/user/Navbar";
import Wishlist from "./components/user/Wishlist";
import ProductDetails from "./components/user/ProductDetails";
import Cart from "./components/user/Cart";
import Home from "./components/pages/Home";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminOrders from "./components/admin/AdminOrders";

import ProtectedAdmin from "./components/auth/ProtectedAdmin";
import ProtectedUser from "./components/auth/ProtectedUser";

import MyOrders from "./components/user/MyOrders";

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const totalQty = cart.reduce(
        (sum, item) => sum + (item.qty || 1),
        0
      );

      setCartCount(totalQty);
    };

    updateCartCount();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );
    };
  }, []);

  return (
    <>
      <Navbar cartCount={cartCount} />

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/profile"
  element={
    <ProtectedUser>
      <Profile />
    </ProtectedUser>
  }
/>

        <Route
          path="/register"
          element={<Register />}
        />

        {/* USER */}

        <Route
          path="/cart"
          element={
            <ProtectedUser>
              <Cart />
            </ProtectedUser>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedUser>
              <Wishlist />
            </ProtectedUser>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedUser>
              <MyOrders />
            </ProtectedUser>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin>
              <AdminOrders />
            </ProtectedAdmin>
          }
        />

      </Routes>
    </>
  );
}

export default App;