import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToWishlist as addToWishlistAPI,
} from "../../services/wishlistService";
import {
  addToCart as addToCartAPI,
} from "../../services/cartService";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../services/productService";

function ProductList({ refresh }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const user = JSON.parse(
  localStorage.getItem("user")
);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      setProducts(
        products.filter((p) => p._id !== id)
      );

      alert("Product Deleted Successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };
  

  const handleEdit = async (product) => {
    const newName = prompt(
      "Enter Product Name",
      product.name
    );

    if (!newName) return;

    const newPrice = prompt(
      "Enter Product Price",
      product.price
    );

    if (!newPrice) return;

    try {
      await updateProduct(product._id, {
        ...product,
        name: newName,
        price: Number(newPrice),
      });

      alert("Product Updated Successfully!");
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  const addToWishlist = async (
  product
) => {
  try {
    await addToWishlistAPI(
      product._id
    );

    alert(
      "Added To Wishlist ❤️"
    );
  } catch (error) {
    alert(
      error.response?.data
        ?.message ||
        "Wishlist Error"
    );
  }
};

const addToCart = async (product) => {
  try {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please Login First");
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
  let filteredProducts = products.filter(
    (product) =>
      (product.name + product.category)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  if (sortOrder === "low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortOrder === "high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛍 Products</h2>

        <span className="badge bg-primary fs-6">
          Total Products: {filteredProducts.length}
        </span>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search Products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <div className="row mb-4">
        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              All Categories
            </option>

            <option value="Mobile">
              Mobile
            </option>

            <option value="Laptop">
              Laptop
            </option>

            <option value="Watch">
              Watch
            </option>

            <option value="Shoes">
              Shoes
            </option>
          </select>
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
          >
            <option value="">
              Sort By Price
            </option>

            <option value="low">
              Low → High
            </option>

            <option value="high">
              High → Low
            </option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-warning">
          No Products Found
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="col-lg-4 col-md-6 mb-4"
            >
              <div className="card h-100 shadow border-0">

                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none"
                  >
                    <h5>{product.name}</h5>
                  </Link>

                  <h4 className="text-success">
                    ₹{product.price}
                  </h4>

                  <p>
                    ⭐ Rating:{" "}
                    {product.rating || 4}/5
                  </p>

                  <p>{product.description}</p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong>Stock:</strong>{" "}
                    {product.stock}
                  </p>

                </div>

                <div className="card-footer bg-white border-0">

                  <div className="d-grid gap-2">

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      🛒 Add To Cart
                    </button>

                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        addToWishlist(product)
                      }
                    >
                      ❤️ Wishlist
                    </button>
{user?.role === "admin" && (
  <div className="d-flex gap-2">

    <button
      className="btn btn-primary w-50"
      onClick={() =>
        handleEdit(product)
      }
    >
      Edit
    </button>

    <button
      className="btn btn-danger w-50"
      onClick={() =>
        handleDelete(product._id)
      }
    >
      Delete
    </button>

  </div>
)}

                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;