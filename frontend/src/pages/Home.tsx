import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Välkommen till React Router!</h1>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        Detta är startsidan för vår applikation. Här kan vi navigera till andra sidor.
      </p>
      <Link to="/about" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Om oss
      </Link>
    </div>
  );
};

export default Home;
