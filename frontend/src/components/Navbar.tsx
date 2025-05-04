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
    <div className="sticky top-0 z-50">
      <div className="rounded-b-3xl">
        <div className="shadow-lg shadow-gray-500/30 rounded-b-3xl">
          <nav className="navbar-gradient rounded-b-3xl overflow-hidden py-5 px-6 md:px-12 relative">
            <div className="container max-w-screen-xl mx-auto flex items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="text-[28px] font-extrabold tracking-wide text-dark transition-transform duration-300 hover:scale-105"
              >
                PlanIt
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="xl:hidden text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-10 text-white font-semibold text-lg">
                <NavLink to="/" label="Home" />
                <NavLink to="/about" label="About Us" />
                {isLoggedIn && (
                  <>
                    <NavLink to="/dashboard" label="Dashboard" />
                    <NavLink to="/add-todo" label="Add Todo" />
                  </>
                )}
              </div>

              {/* Right-side Desktop */}
              <div className="hidden xl:flex items-center gap-4 text-white">
                {isLoggedIn ? (
                  <>
                    <span className="text-white text-base">Hey, {name}!</span>
                    <NavButton to="/profile" label="Profile" style="bg-primary" />
                    <button
                      onClick={handleLogout}
                      className="bg-dark hover:bg-primary text-white px-4 py-2 rounded-lg transition text-base"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavButton to="/login" label="Login" style="bg-primary" />
                    <NavButton to="/register" label="Register" style="bg-secondary" />
                  </>
                )}
              </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
              <div className="xl:hidden mt-4 flex flex-col items-end text-right gap-4 text-white font-medium px-6 animate-fade-in">
                <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
                <MobileLink to="/about" label="About Us" onClick={() => setMenuOpen(false)} />
                {isLoggedIn && (
                  <>
                    <MobileLink to="/dashboard" label="Dashboard" onClick={() => setMenuOpen(false)} />
                    <MobileLink to="/add-todo" label="Add Todo" onClick={() => setMenuOpen(false)} />
                    <MobileLink to="/profile" label="Profile" onClick={() => setMenuOpen(false)} />
                  </>
                )}
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-right hover:text-primary transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <MobileLink to="/login" label="Login" onClick={() => setMenuOpen(false)} />
                    <MobileLink to="/register" label="Register" onClick={() => setMenuOpen(false)} />
                  </>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

// Reusable nav links for desktop
const NavLink = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="hover:text-primary transition duration-200"
  >
    {label}
  </Link>
);

// Reusable nav links for mobile with hover
const MobileLink = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className="w-full text-right hover:text-primary transition"
  >
    {label}
  </Link>
);

// Button-like link
const NavButton = ({
  to,
  label,
  style,
}: {
  to: string;
  label: string;
  style: string;
}) => (
  <Link
    to={to}
    className={`${style} text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-base`}
  >
    {label}
  </Link>
);

export default Navbar;
