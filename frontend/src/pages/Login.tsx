import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import InputField from "../components/UI/InputField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (!data.token || !data.user) {
        setError("Login failed: Invalid response from server.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(setUser(data.user));
      navigate("/profile");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral px-4">
      <div className="bg-dark bg-background text-dark p-10 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-4xl text-bluegray font-bold mb-6">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <InputField
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-primary text-soft-beige py-3 rounded-lg text-lg font-semibold hover:bg-primary-light transition-all"
          >
            Login
          </button>

          <Link
            to="/forgot-password"
            className="mt-2 text-warmbeige hover:text-primary-light transition-all text-sm"
          >
            Have you forgotten your password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
