import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/UI/InputField"
import VerifyEmail from "../../components/api/VerifyEmail";
import TermsModal from "./TermsModal"; // Import the TermsModal component

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
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
      if (!res.ok) {
        setError(data.message);
        return;
      }

      setStep(2);
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError("Could not connect to the server.");
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
      if (!res.ok) {
        setError(data.message);
        return;
      }

      setResendMessage("A new verification code has been sent!");
    } catch (err) {
      console.error("❌ Error resending code:", err);
      setError("Could not send a new code.");
    }
  };

  const openTermsModal = () => setIsModalOpen(true);
  const closeTermsModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral px-4">
      {/* 🔹 Registration Box */}
      <div className="bg-dark bg-background text-dark p-10 rounded-lg shadow-lg w-full max-w-lg text-center">
        
        {/* 🔹 Title */}
        <h1 className="text-4xl text-bluegray font-bold mb-6">Register</h1>

        {/* 🔹 Step 1: Registration Form */}
        {step === 1 ? (
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <InputField
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
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

            <button type="submit" className="bg-primary text-soft-beige py-3 rounded-lg text-lg font-semibold hover:bg-primary-light transition-all">
              Register
            </button>

            {/* 🔹 Already have an account? */}
            <p className="text-sm text-warmbeige mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-light hover:underline">
                Login here
              </Link>
            </p>

            {/* 🔹 Terms Link */}
            <p className="text-sm text-warmbeige mt-2">
              By registering, you agree to our{" "}
              <button onClick={openTermsModal} className="text-primary-light hover:underline">
                Terms of Service
              </button>.
            </p>
          </form>
        ) : (
          /* 🔹 Step 2: Verification Message */
          <div className="flex flex-col items-center justify-center min-h-screen bg-neutral px-4 mt-8">

            <p className="text-softlilac text-center">
              A mail has been sent for verification, check your inbox. If you haven't received it, you can resend the email below.
            </p>
            
            <VerifyEmail name={name} email={email} password={password} onSuccess={() => navigate("/login")} />

            <button onClick={handleResendCode} className="text-primary-light hover:underline">
              Resend verification email
            </button>

            {resendMessage && <p className="text-green-500 text-sm">{resendMessage}</p>}
          </div>
        )}
      </div>

      {/* 🔹 Terms Modal */}
      <TermsModal isOpen={isModalOpen} onClose={closeTermsModal} />
    </div>
  );
};

export default Register;
