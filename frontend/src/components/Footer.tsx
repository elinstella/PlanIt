// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-dark text-mutedlilac py-6 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm gap-4">
        
        {/* Left: Copyright */}
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} PlanIt. All rights reserved.
        </p>

        {/* Right: Nav links */}
      
      </div>
    </footer>
  );
};

export default Footer;
