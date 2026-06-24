import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/orderService";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();

      setOrders(data || []);
    } catch (error) {
      console.error("Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusUpdate = async (
    orderId,
    status
  ) => {
    try {
      await updateOrderStatus(
        orderId,
        status
      );

      alert(
        "Order Status Updated ✅"
      );

      loadOrders();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        📦 Admin Orders
      </h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning">
          No Orders Found
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card mb-3 shadow"
          >
            <div className="card-body">

              <h5>
                User: {order.user?.name}
              </h5>

              <p>
                Email: {order.user?.email}
              </p>

              <p>
                Total: ₹{order.totalAmount}
              </p>

              <p>
                Current Status:
                {" "}
                <strong>
                  {order.status}
                </strong>
              </p>

              <div className="row mb-3">

                <div className="col-md-6">

                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

              <hr />

              <h6>
                Ordered Products:
              </h6>

              {order.items?.map((item) => (
                <div key={item._id}>
                  •{" "}
                  {item.product?.name}
                  {" × "}
                  {item.quantity}
                </div>
              ))}

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default AdminOrders;