// components/Footer.tsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-mutedlilac py-6 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm gap-4">
        
        {/* Left: Copyright */}
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} PlanIt. All rights reserved.
        </p>

        {/* Right: Nav links */}
        <div className="flex gap-6">
          <Link to="/about" className="hover:text-accent transition">About</Link>
          <Link to="/dashboard" className="hover:text-accent transition">Dashboard</Link>
          <Link to="/add-todo" className="hover:text-accent transition">Add Todo</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
