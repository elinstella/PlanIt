import { Link } from "react-router-dom";
import EmailSender from "../components/api/send-email";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral px-6 py-12">

      
      {/* 🔹 Hero Section */}
      <div className="text-center text-soft-beige max-w-3xl mt-16"> {/* Added more margin-top (mt-16 ≈ 64px) */}
        <h1 className="text-5xl font-extrabold text-primary mb-6">Welcome to PlanIt</h1>
        <p className="text-lg  text-dark  leading-relaxed">
        PlanIt is a simple and powerful task management app designed to help you stay organized, prioritize, and complete your tasks with ease. 
        Whether you're managing your personal to-dos or tracking deadlines, PlanIt ensures you stay on top of your schedule, never missing a deadline.
        Streamline your workflow, stay focused, and manage your tasks efficiently.
        </p>
      </div>

  
      {/* 🔹 Call to Action Buttons */}
      <div className="flex space-x-6 mt-12">
        <Link to="/about" className="bg-secondary text-warmbeige px-6 py-3 rounded-lg shadow-md text-lg font-medium hover:bg-secondary-light transition">
          Learn More
        </Link>
        <Link to="/register" className="bg-primary text-warmbeige px-6 py-3 rounded-lg shadow-md text-lg font-medium hover:bg-primary-light transition">
          Get Started
        </Link>
      </div>

      {/* 🔹 Email Subscription */}
      <div className="mt-16">
        <EmailSender />
      </div>
    </div>
  );
};

export default Home;
