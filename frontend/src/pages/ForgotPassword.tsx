import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Något gick fel.");

      setMessage("En återställningslänk har skickats till din e-post.");
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
      <h1 className="text-2xl font-bold">Glömt lösenord?</h1>
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg">
        <input
          type="email"
          placeholder="Ange din e-post"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Skicka återställningslänk
        </button>
      </form>
      <Link to="/login" className="mt-4 text-blue-500 hover:underline">Tillbaka till inloggning</Link>
    </div>
  );
};

export default ForgotPassword;
