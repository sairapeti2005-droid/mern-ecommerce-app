import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">

        <Link
          to="/admin"
          className="navbar-brand"
        >
          🛠 Admin Panel
        </Link>

        <div className="d-flex gap-2">

          <Link
            to="/admin"
            className="btn btn-outline-light"
          >
            Dashboard
          </Link>

          <Link
            to="/"
            className="btn btn-warning"
          >
            User Store
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;