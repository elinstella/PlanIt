import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral px-4">
      {/* 🔹 About Us Box */}
      <div className="bg-dark bg-background text-soft-beige p-10 rounded-lg shadow-lg w-full max-w-lg text-center">
        
        {/* 🔹 Title */}
        <h1 className="text-4xl text-bluegray font-bold mb-6">About Us</h1>

        {/* 🔹 Description */}
        <p className="text-softlilac text-center text-lg leading-relaxed">
          Welcome to <span className="text-primary font-semibold">PlanIt</span> – your ultimate task management solution! 
          Our mission is to **simplify productivity** by providing an intuitive platform for organizing your tasks, 
          collaborating with teams, and staying ahead of deadlines. 🚀
        </p>

        <p className="mt-4 text-mutedlilac text-center">
          Whether you are working solo or managing a team project, **PlanIt** helps you focus on what matters most – 
          every single day!
        </p>

        {/* 🔹 Back to Home Button */}
        <Link to="/" className="mt-6 inline-block bg-primary text-soft-beige py-3 px-6 rounded-lg text-lg font-semibold hover:bg-primary-light transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;
