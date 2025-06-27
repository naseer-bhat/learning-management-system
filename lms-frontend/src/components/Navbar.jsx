import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        LMS
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            )}
            {user.role === "instructor" && (
              <Link to="/instructor/dashboard">Instructor Dashboard</Link>
            )}
            {user.role === "student" && (
              <Link to="/student/dashboard">Student Dashboard</Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
