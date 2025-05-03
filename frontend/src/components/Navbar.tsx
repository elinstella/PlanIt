// components/Navbar.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearUser } from "../store/userSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name } = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!id;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="bg-background sticky top-0 z-50">
      <div className="rounded-b-3xl shadow-md overflow-hidden">
        <nav className="navbar-gradient py-6 px-6 md:px-12 relative">
          <div className="container max-w-screen-xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-4xl font-extrabold tracking-wide text-dark"
            >
              PlanIt
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Centered Desktop Menu (Only on large screens) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-10 text-white font-semibold text-xl">
              <Link to="/" className="hover:text-primary transition">Home</Link>
              <Link to="/about" className="hover:text-primary transition">About Us</Link>
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link>
                  <Link to="/add-todo" className="hover:text-primary transition">Add Todo</Link>
                </>
              )}
            </div>

            {/* Right-side Controls */}
            <div className="hidden lg:flex items-center gap-4 text-white">
              {isLoggedIn ? (
                <>
                  <span className="text-white text-lg">Hello, {name}!</span>
                  <Link to="/profile" className="hover:text-primary text-lg">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="bg-dark hover:bg-primary text-white px-4 py-2 rounded-lg transition text-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition text-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition text-lg"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
  <div className="lg:hidden mt-4 flex flex-col items-end text-right gap-4 text-white font-medium px-6 animate-fade-in">
    <Link to="/" onClick={() => setMenuOpen(false)} className="w-full">Home</Link>
    <Link to="/about" onClick={() => setMenuOpen(false)} className="w-full">About Us</Link>
    {isLoggedIn && (
      <>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="w-full">Dashboard</Link>
        <Link to="/add-todo" onClick={() => setMenuOpen(false)} className="w-full">Add Todo</Link>
      </>
    )}
    {isLoggedIn ? (
      <>
        <Link to="/profile" onClick={() => setMenuOpen(false)} className="w-full">Profile</Link>
        <button onClick={handleLogout} className="w-full text-right">Logout</button>
      </>
    ) : (
      <>
        <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full">Login</Link>
        <Link to="/register" onClick={() => setMenuOpen(false)} className="w-full">Register</Link>
      </>
    )}
  </div>
)}

        </nav>
      </div>
    </div>
  );
};

export default Navbar;
