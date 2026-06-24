import { useEffect, useState } from "react";

import {
  getWishlist,
  removeWishlistItem,
} from "../../services/wishlistService";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();

      setWishlist(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeWishlist = async (id) => {
    try {
      await removeWishlistItem(id);

      setWishlist(
        wishlist.filter(
          (item) => item._id !== id
        )
      );

      alert("Removed from Wishlist");
    } catch (error) {
      console.error(error);
      alert("Remove Failed");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading Wishlist...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        ❤️ Wishlist ({wishlist.length})
      </h2>

      {wishlist.length === 0 ? (
        <div className="alert alert-warning">
          Wishlist Empty
        </div>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="col-md-4 mb-4"
            >
              <div className="card shadow h-100">
                <img
                  src={
                    item.product?.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={item.product?.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h5>
                    {item.product?.name}
                  </h5>

                  <h4 className="text-success">
                    ₹{item.product?.price}
                  </h4>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                      removeWishlist(item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;