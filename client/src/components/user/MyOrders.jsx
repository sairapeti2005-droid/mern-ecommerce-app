import { useEffect, useState } from "react";

import {
  getMyOrders,
} from "../../services/orderService";

function MyOrders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    const fetchOrders =
      async () => {
        try {
          const data =
            await getMyOrders();

          setOrders(data);
        } catch (error) {
          console.error(error);
        }
      };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2>
        📦 My Orders
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
                Order ID:
                {" "}
                {order._id}
              </h5>

              <p>
                Status:
                {" "}
                <strong>
                  {order.status}
                </strong>
              </p>

              <p>
                Total:
                {" "}
                ₹
                {order.totalAmount}
              </p>

              <hr />

              {order.items.map(
                (item) => (
                  <div
                    key={
                      item._id
                    }
                  >
                    {item.product
                      ?.name}
                    {" "}
                    ×
                    {" "}
                    {
                      item.quantity
                    }
                  </div>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;