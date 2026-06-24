import { useEffect, useState } from "react";

import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../../services/cartService";

import {
  placeOrder,
} from "../../services/orderService";

import {
  createPaymentOrder,
} from "../../services/paymentService";

function Cart() {
  const [cartItems, setCartItems] =
    useState([]);

  const loadCart = async () => {
    try {
      const data = await getCart();

      setCartItems(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseQty = async (item) => {
    try {
      await updateCartItem(
        item._id,
        item.quantity + 1
      );

      loadCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await updateCartItem(
        item._id,
        item.quantity - 1
      );

      loadCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await removeCartItem(id);

      loadCart();

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      item.product.price *
        item.quantity,
    0
  );
  

  const handlePayment = async () => {
    try {
      const order =
        await createPaymentOrder(
          totalPrice
        );

      const options = {
        key:
          "rzp_test_T5LQOlqlCEYuZ1",

        amount: order.amount,

        currency: order.currency,

        name:
          "E-Commerce Store",

        description:
          "Order Payment",

        order_id: order.id,

        handler: async function (
          response
        ) {
          try {
            await placeOrder();

            alert(
              "Payment Successful ✅"
            );

            loadCart();

            window.dispatchEvent(
              new Event(
                "cartUpdated"
              )
            );
          } catch (error) {
            console.error(error);

            alert(
              "Order Creation Failed"
            );
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Payment Failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        🛒 Cart ({cartItems.length})
      </h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">
          Cart Empty
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="card mb-3 shadow"
            >
              <div className="card-body">

                <h5>
                  {item.product.name}
                </h5>

                <h4 className="text-success">
                  ₹{item.product.price}
                </h4>

                <div className="d-flex align-items-center gap-2">

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      decreaseQty(item)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      increaseQty(item)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="btn btn-outline-danger mt-3"
                  onClick={() =>
                    removeItem(item._id)
                  }
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

          <div className="card p-3 shadow">

            <h3>
              Total: ₹{totalPrice}
            </h3>

            <button
              className="btn btn-success mt-3"
              onClick={handlePayment}
            >
              Pay Now 💳
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;