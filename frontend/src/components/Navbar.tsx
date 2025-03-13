import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔹 Token:", token); // Debug-logg

    if (token) {
      setIsLoggedIn(true);
      axios
        .get<{ name: string }>("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("✅ Hämtat användardata:", response.data);
          setUsername(response.data.name);
        })
        .catch((error) => {
          console.error("❌ Kunde inte hämta användarnamn", error);
          setUsername("Användare");
        });
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

        {/* Meny och Inloggning/Användare - Flyttat till höger */}
        <div className="flex items-center space-x-6 ml-auto text-lg font-medium">
          <Link to="/" className="hover:text-primary transition-all">Hem</Link>
          <Link to="/about" className="hover:text-primary transition-all">Om oss</Link>
          {isLoggedIn ? (
            <>
              <span className="font-semibold">Hej, {username}!</span>
              <Link to="/profile" className="hover:text-primary transition-all">Profil</Link>
              <button onClick={handleLogout} className="bg-gray-600 text-soft-beige hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-all shadow-md">
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-primary text-soft-beige hover:bg-[#5e3a8c] px-4 py-2 rounded-lg font-medium transition-all shadow-md">
                Logga in
              </Link>
              <Link to="/register" className="bg-warm-ocre text-background hover:bg-[#c47c2a] px-4 py-2 rounded-lg font-medium transition-all shadow-md">
                Registrera
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;