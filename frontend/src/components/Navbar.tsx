import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      setUsername("Användare"); // Här kan vi hämta riktig användardata senare
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
    <nav className="bg-purple-800 py-6 px-8 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center text-white">
        {/* Logo / Titel */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform">
          PlanIt
        </Link>

        {/* Meny */}
        <div className="space-x-6 text-lg font-medium flex items-center">
          <Link to="/" className="hover:text-gray-300 transition-all">Hem</Link>
          <Link to="/about" className="hover:text-gray-300 transition-all">Om oss</Link>

          {isLoggedIn ? (
            <>
              <span className="font-semibold">Hej, {username}!</span>
              <Link to="/profile" className="hover:text-gray-300 transition-all">Profil</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all">
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                Registrera
              </Link>
              <Link to="/login" className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                Logga in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
