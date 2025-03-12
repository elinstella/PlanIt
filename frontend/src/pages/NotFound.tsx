import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold text-red-800">404 - Sidan hittades inte</h1>
      <Link to="/" className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Gå till startsidan</Link>
    </div>
  );
};

export default NotFound;
