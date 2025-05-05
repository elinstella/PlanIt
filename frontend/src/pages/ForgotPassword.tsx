import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/UI/InputField"; // ✅ Import InputField

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
      if (!res.ok) throw new Error(data.message || "Something went wrong.");

      setMessage("A reset link has been sent to your email.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral px-4">
      {/* 🔹 Centered Card */}
      <div className="bg-dark bg-background text-dark p-10 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-4xl text-bluegray font-bold mb-6">Forgot Password?</h1> {/* 🔹 Title inside the box */}

        <form onSubmit={handleForgotPassword} className="flex flex-col gap-5">
          <InputField
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button type="submit" className="bg-primary text-soft-beige py-3 rounded-lg text-lg font-semibold hover:bg-primary-light transition-all">
            Send Reset Link
          </button>

          {/* 🔹 Back to Login Link */}
          <Link to="/login" className="mt-2 text-warmbeige hover:text-primary-light transition-all text-sm">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
