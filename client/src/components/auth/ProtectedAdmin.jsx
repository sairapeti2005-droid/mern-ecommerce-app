import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Access Denied! Admin Only.
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedAdmin;