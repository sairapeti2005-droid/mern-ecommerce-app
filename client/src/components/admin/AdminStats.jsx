import { useEffect, useState } from "react";
import { getAdminStats }
  from "../../services/adminService";

function AdminStats() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data =
          await getAdminStats();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  if (!stats) {
    return <h4>Loading Stats...</h4>;
  }

  return (
    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card shadow p-3">
          <h5>👥 Users</h5>
          <h2>{stats.totalUsers}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow p-3">
          <h5>🛍 Products</h5>
          <h2>{stats.totalProducts}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow p-3">
          <h5>📦 Orders</h5>
          <h2>{stats.totalOrders}</h2>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow p-3">
          <h5>💰 Revenue</h5>
          <h2>₹{stats.totalRevenue}</h2>
        </div>
      </div>

    </div>
  );
}

export default AdminStats;