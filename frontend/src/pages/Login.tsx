import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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

    console.log("Token received on login:", data.token);
    localStorage.setItem("token", data.token);
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg">
        <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Button type="submit" className="w-full">Login</Button>
        <p className="text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Have you forgotten your password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
