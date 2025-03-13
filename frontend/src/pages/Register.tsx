import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "../components/api/VerifyEmail";

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setStep(2);
    } catch (err) {
      console.log(err);
      setError("Kunde inte ansluta till servern");
    }
  };

  const handleResendCode = async () => {
    setResendMessage("");
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setResendMessage("A new verification code has been sent!");
    } catch (err) {
      console.log(err);
      setError("Could not send a new code");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Register</h1>
      {step === 1 ? (
        <form onSubmit={handleRegister} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-80">
          <input type="text" placeholder="Name" className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Register</button>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-md rounded-lg w-80">
          <p className="text-gray-700 text-center">
            A mail has been sent for verification, check your inbox. If you haven't received it, you can resend the email below.
          </p>
          <VerifyEmail name={name} email={email} password={password} onSuccess={() => navigate("/login")} />
          <button onClick={handleResendCode} className="text-blue-600 underline">
            Resend verification email
          </button>
          {resendMessage && <p className="text-green-500">{resendMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Register;
