import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); // Omdirigera om användaren inte är inloggad
    } else {
      setUser("Användare"); // Här kan vi hämta riktig användardata senare
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null; // Förhindra att sidan visas innan navigering sker

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Din Profil</h1>
      <p className="mt-2">Välkommen, {user}!</p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600">
        Logga ut
      </button>
    </div>
  );
};

export default Profile;
