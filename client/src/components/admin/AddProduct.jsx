import { useState } from "react";
import { addProduct } from "../../services/productService";

function AddProduct({ refreshProducts }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await addProduct(product);

      console.log("Added Product:", data);

      alert("✅ Product Added Successfully!");

      refreshProducts();

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">
            ➕ Add New Product
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Mobile, Laptop, Watch..."
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Price (₹)
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Available quantity"
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="Enter product description"
                  required
                />
              </div>

              <div className="col-12 mb-4">
                <label className="form-label">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://..."
                />
              </div>

            </div>

            <div className="d-flex gap-3">
              <button
                type="submit"
                className="btn btn-success flex-fill"
                disabled={loading}
              >
                {loading
                  ? "Adding Product..."
                  : "Add Product"}
              </button>

              <button
                type="button"
                className="btn btn-secondary flex-fill"
                onClick={clearForm}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;