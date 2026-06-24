import AddProduct from "../admin/AddProduct";

function AdminHome() {
  return (
    <div className="container mt-4">
      <h1>📊 Admin Dashboard</h1>

      <AddProduct refreshProducts={() => {}} />
    </div>
  );
}

export default AdminHome;