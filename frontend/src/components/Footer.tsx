const Footer = () => {
  return (
    <footer className="bg-dark text-mutedlilac py-9 px-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center text-sm gap-4">
        
        {/* Left: Copyright */}
        <p className="text-center">
          &copy; {new Date().getFullYear()} PlanIt. All rights reserved.
        </p>

        {/* Right: Nav links */}
        {/* You can add additional footer links here */}
      </div>
    </footer>
  );
};

export default Footer;
