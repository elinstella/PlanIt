import { Link } from "react-router-dom";
import EmailSender from "../components/api/send-email";
import Button from "../components/UI/Button";

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
      <EmailSender />
      <div className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-3">
  <Button variant="login">Login</Button>
  <Button variant="register">Register</Button>
  <Button variant="logout">Logout</Button>
  <Button variant="delete">Delete</Button>
  <Button variant="confirm">Confirm</Button>
  <Button variant="cancel">Cancel</Button>
  <Button variant="update">Update</Button>
</div>

</div>

    </div>
  );
};

export default Home;
