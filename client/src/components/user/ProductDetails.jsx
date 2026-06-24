import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { getProducts } from "../../services/productService";
import { addToCart as addToCartAPI } from "../../services/cartService";
import { addToWishlist as addToWishlistAPI } from "../../services/wishlistService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();

        const selected = products.find(
          (p) => p._id === id
        );

        setProduct(selected);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      await addToCartAPI(product._id);

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      alert("Added To Cart 🛒");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed To Add Cart"
      );
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      await addToWishlistAPI(product._id);

      window.dispatchEvent(
        new Event("wishlistUpdated")
      );

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Wishlist Error"
      );
    }
  };

  const buyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="container mt-5">
        <h3>Loading Product...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Link
        to="/"
        className="btn btn-secondary mb-4"
      >
        ← Back
      </Link>

      <div className="card shadow-lg border-0">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={
                product.image ||
                "https://via.placeholder.com/500"
              }
              alt={product.name}
              className="img-fluid"
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body">
              <h2>{product.name}</h2>

              <h3 className="text-success">
                ₹{product.price}
              </h3>

              <p>
                ⭐ Rating: {product.rating || 4}/5
              </p>

              <hr />

              <p>
                <strong>Category:</strong>{" "}
                {product.category}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {product.stock}
              </p>

              <p>{product.description}</p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={handleAddToCart}
                >
                  🛒 Add To Cart
                </button>

                <button
                  className="btn btn-warning"
                  onClick={handleAddToWishlist}
                >
                  ❤️ Wishlist
                </button>

                <button
                  className="btn btn-primary"
                  onClick={buyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;