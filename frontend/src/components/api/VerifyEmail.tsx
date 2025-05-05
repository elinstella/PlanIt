import { useState, useRef } from "react";

const VerifyEmail = ({ name, email, password, onSuccess }: { name: string; email: string; password: string; onSuccess: () => void }) => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          code: code.join(""),
          password,  // Skickar nu det korrekta lösenordet från registreringen
        }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);
      setSuccess("Registrering lyckades!");
      setTimeout(onSuccess, 2000);
    } catch (err) {
      console.log(err);
      setError("Kunde inte ansluta till servern");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/\d?/.test(value)) return; // Endast siffror tillåtna
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={handleVerifyCode} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg w-80">
      <div className="flex space-x-2 justify-center">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <button type="submit" className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Verifiera</button>
    </form>
  );
};

export default VerifyEmail;
