import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div className="container mt-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2>👤 My Profile</h2>

        <hr />

        <h5>Name</h5>
        <p>{user.name}</p>

        <h5>Email</h5>
        <p>{user.email}</p>

        <h5>Role</h5>
        <p>{user.role}</p>

      </div>
    </div>
  );
}

export default Profile;