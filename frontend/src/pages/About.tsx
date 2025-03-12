import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Om oss</h1>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        Detta är en enkel sida byggd med React Router. Här kan vi lägga till mer information om projektet och teamet.
      </p>
      <Link to="/" className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
        Tillbaka till start
      </Link>
    </div>
  );
};

export default About;
