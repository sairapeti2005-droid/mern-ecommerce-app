import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWishlist } from "../../services/wishlistService";

function Navbar({ cartCount }) {
  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);

    const loadWishlist = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          setWishlistCount(0);
          return;
        }

        const data =
          await getWishlist();

        setWishlistCount(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    loadWishlist();

    window.addEventListener(
      "wishlistUpdated",
      loadWishlist
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        loadWishlist
      );
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-dark bg-primary shadow">
      <div className="container">

        <Link
          to="/"
          className="navbar-brand fw-bold"
        >
          🛒 E-Commerce Store
        </Link>

        <div className="d-flex gap-2">

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="btn btn-danger"
            >
              🛠 Admin
            </Link>
          )}

          <Link
            to="/wishlist"
            className="btn btn-warning"
          >
            ❤️ {wishlistCount}
          </Link>

          <Link
            to="/cart"
            className="btn btn-light"
          >
            🛒 Cart ({cartCount})
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-dark"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-success"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="btn btn-info">
                {user.name}
              </span>
              <Link
  to="/orders"
  className="btn btn-info"
>
  Orders
</Link>

              <button
                className="btn btn-secondary"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;