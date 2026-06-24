import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../services/productService";

function AdminProducts({ refresh }) {
  const [products, setProducts] = useState([]);

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

      alert("Product Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
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

      alert("Product Updated Successfully");

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>📦 Manage Products</h2>

      <div className="row">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-md-4 mb-4"
          >
            <div className="card h-100 shadow">

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5>{product.name}</h5>

                <h4 className="text-success">
                  ₹{product.price}
                </h4>

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

              <div className="card-footer">
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
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;