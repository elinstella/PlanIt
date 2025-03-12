import { useState } from "react";

const EmailSender = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const sendEmail = async () => {
    setMessage(""); // Rensa tidigare meddelande
    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("E-post skickad!");
        setIsSent(true);
      } else {
        setMessage(data.message || "Misslyckades att skicka e-post.");
      }
    } catch (error) {
        console.error(error)
      setMessage("Något gick fel. Försök igen.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Skicka e-post</h2>
      <input
        type="email"
        placeholder="Skriv in din e-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={sendEmail}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Skicka e-post
      </button>

      {isSent && (
        <button
          onClick={sendEmail}
          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Skicka igen
        </button>
      )}

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default EmailSender;
