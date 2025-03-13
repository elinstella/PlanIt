import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      axios
        .get<{ name: string }>("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUsername(response.data.name))
        .catch(() => setUsername("User"));
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername(null);
    navigate("/login");
  };

  return (
    <nav className="bg-background py-6 px-8 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center text-soft-beige">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform">
          PlanIt
        </Link>

        {/* Menu & Authentication */}
        <div className="flex items-center space-x-6 ml-auto text-lg font-medium">
          <Link to="/" className="hover:text-primary transition-all">Home</Link>
          <Link to="/about" className="hover:text-primary transition-all">About Us</Link>

          {isLoggedIn ? (
            <>
              <span className="font-semibold">Hello, {username}!</span>
              <Link to="/profile" className="hover:text-primary transition-all">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-soft-beige hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-all shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-primary text-soft-beige hover:bg-[#5e3a8c] px-4 py-2 rounded-lg font-medium transition-all shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-warm-ocre text-background hover:bg-[#c47c2a] px-4 py-2 rounded-lg font-medium transition-all shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
