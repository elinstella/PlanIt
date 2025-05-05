import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Något gick fel.");
      
      setMessage("Ditt lösenord har återställts!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ett okänt fel inträffade.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Återställ lösenord</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg">
        <input 
          type="password" 
          placeholder="Nytt lösenord" 
          className="p-2 border rounded" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Bekräfta nytt lösenord" 
          className="p-2 border rounded" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Återställ lösenord
        </button>
      </form>
      <Link to="/login" className="mt-4 text-blue-500 hover:underline">Tillbaka till inloggning</Link>
    </div>
  );
};

export default ResetPassword;