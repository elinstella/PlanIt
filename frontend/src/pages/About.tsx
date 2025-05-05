import { Link } from "react-router-dom"; // Importera Link

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral px-4">
      {/* 🔹 About Us Box */}
      <div className="bg-dark text-soft-beige p-10 rounded-lg shadow-lg w-full max-w-lg text-center">
        
        {/* 🔹 Title */}
        <h1 className="text-4xl text-bluegray font-bold mb-6">About Us</h1>

        {/* 🔹 Description */}
        <p className="text-softlilac text-center text-lg leading-relaxed">
          Welcome to <span className="text-primary font-semibold">PlanIt</span> – your ultimate task management solution! 
          Our mission is to **simplify productivity** by providing an intuitive platform to organize and manage your tasks, 
          ensuring you stay ahead of deadlines. 🚀
        </p>

        <p className="mt-4 text-mutedlilac text-center">
          Whether you're managing personal tasks or handling a busy schedule, **PlanIt** helps you stay focused and organized, 
          making sure nothing slips through the cracks.
        </p>

        <p className="mt-4 text-mutedlilac text-center">
          Best of all, PlanIt is completely FREE to use! No hidden costs, just a powerful tool to help you accomplish your goals.
        </p>

        {/* 🔹 Register Link styled like "Back to Home" Button */}
        <Link 
          to="/register" 
          className="mt-6 inline-block bg-primary text-soft-beige py-3 px-6 rounded-lg text-lg font-semibold hover:bg-primary-light transition-all"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
};

export default About;
