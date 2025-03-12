import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userData = { name, email, password };

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("Svar från backend:", data); // 🔍 Logga svaret för felsökning

      if (!res.ok) {
        setError(data.message || "Något gick fel, försök igen.");
        return;
      }

      setSuccess("Registrering lyckades! Omdirigerar...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registreringsfel:", err);
      setError("Kunde inte ansluta till servern, försök igen senare.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Registrera dig</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-80">
        <input 
          type="text" 
          placeholder="Namn" 
          className="p-2 border rounded" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="E-post" 
          className="p-2 border rounded" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Lösenord" 
          className="p-2 border rounded" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Registrera
        </button>
      </form>
    </div>
  );
};

export default Register;
