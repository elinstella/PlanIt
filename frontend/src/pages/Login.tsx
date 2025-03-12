import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      setError(data.message || "Inloggning misslyckades");
      return;
    }
  
    console.log("Token mottagen vid inloggning:", data.token); // Debug-logga token
    localStorage.setItem("token", data.token);
    navigate("/profile");
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Logga in</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg">
        <input type="email" placeholder="E-post" className="p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Lösenord" className="p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Logga in</button>
      </form>
    </div>
  );
};

export default Login;
