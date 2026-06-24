import { useState } from "react";
import { Link } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AddProduct from "./AddProduct";
import AdminProducts from "./AdminProducts";
import AdminStats from "./AdminStats";

function AdminDashboard() {
  const [refresh, setRefresh] = useState(false);

  const refreshProducts = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">

        <h1 className="mb-4">
          📊 Admin Dashboard
        </h1>

        {/* Analytics Cards */}
        <AdminStats />

        <div className="mb-4">
          <Link
            to="/admin/orders"
            className="btn btn-dark"
          >
            📦 View Orders
          </Link>
        </div>

        <AddProduct
          refreshProducts={refreshProducts}
        />

        <hr />

        <AdminProducts refresh={refresh} />

      </div>
    </>
  );
}

export default AdminDashboard;