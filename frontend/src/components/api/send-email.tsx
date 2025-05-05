import { useState } from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

const EmailSender = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const sendEmail = async () => {
    setMessage(""); // Clear previous message

    try {
      console.log("📨 Sending email to:", email);

      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("🔵 API Response from /api/send-email:", data);

      if (response.ok) {
        setMessage("Email sent successfully!");
        setIsSent(true);
      } else {
        setMessage(data.message || "Failed to send email.");
      }
    } catch (error) {
      console.error("❌ Error sending email:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-auto flex items-center justify-center p-6 mt-4"> {/* Minskat avstånd från andra komponenter */}
      {/* 🔹 Email Sender Box with bg-dark background */}
      <div className="bg-dark p-16 rounded-lg shadow-lg w-full max-w-3xl text-center"> {/* Changed background color */}
        <h1 className="text-3xl text-white font-bold mb-6">Subscribe for Updates</h1> {/* White text color for better contrast */}

        <form className="flex flex-col gap-5">
          <InputField
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button variant="confirm" className="w-full py-3" onClick={sendEmail}>
            Send Email
          </Button>

          {isSent && (
            <Button variant="update" className="w-full py-3" onClick={sendEmail}>
              Resend Email
            </Button>
          )}

          {message && <p className="text-white text-sm mt-2">{message}</p>} {/* White text for the message */}
        </form>
      </div>
    </div>
  );
};

export default EmailSender;
