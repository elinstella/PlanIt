import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearUser } from "../store/userSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, name } = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!id;

  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    setForceRender((prev) => prev + 1);
  }, [id, name]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <div className="bg-background shadow-lg sticky top-0 z-50">
      <nav className="navbar-gradient py-4 px-6 md:px-12 shadow-md rounded-b-2xl" key={forceRender}>
        <div className="container mx-auto flex items-center justify-between text-warmbeige">
          {/* Logo */}
          <Link to="/" className="text-3xl md:text-4xl font-extrabold tracking-wide hover:scale-105 transition-transform text-dark">
            PlanIt
          </Link>

          {/* Menylänkar centrerade i navbaren */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-lg md:text-xl font-semibold">
            <Link to="/" className="hover:text-dark transition-all">Home</Link>
            <Link to="/about" className="hover:text-dark transition-all">About Us</Link>
          </div>

          {/* Profil & Inloggning/Utloggning till höger */}
          <div className="flex items-center space-x-4 md:space-x-6 text-sm md:text-lg font-medium">
            {isLoggedIn ? (
              <>
                <span className="font-semibold text-dark text-base md:text-xl">Hello, {name}!</span>
                <Link to="/profile" className="hover:text-dark transition-all text-base md:text-xl">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="bg-dark hover:bg-neutral px-4 md:px-5 py-2 md:py-3 rounded-lg font-medium transition-all shadow-md text-base md:text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-primary text-warmbeige hover:bg-primary-light px-4 md:px-5 py-2 md:py-3 rounded-lg font-medium transition-all shadow-md text-base md:text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-secondary text-warmbeige hover:bg-secondary-light px-4 md:px-5 py-2 md:py-3 rounded-lg font-medium transition-all shadow-md text-base md:text-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
