import React, { useState, useEffect } from "react";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import Modal from "../components/UI/Modal";
import Alert from "../components/UI/Alert";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<'success' | null>(null);

  const [errors, setErrors] = useState({
    name: "",
    newEmail: "",
    confirmNewEmail: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) return;

        const data = await response.json();
        setName(data.name);
        setCurrentEmail(data.email);
      } catch {
        // Silent fail
      }
    };

    fetchUserData();
  }, [token]);

  const dispatch = useDispatch();

  const handleUpdateName = async () => {
    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name field cannot be empty." }));
      return;
    }
    setErrors((prev) => ({ ...prev, name: "" }));

    try {
      const response = await fetch("http://localhost:5000/api/profile/update-name", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Failed to update name");

      const updatedUserRes = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!updatedUserRes.ok) throw new Error("Failed to fetch updated user data");

      const updatedUserData = await updatedUserRes.json();
      dispatch(setUser(updatedUserData));

      setAlertMessage("Name updated successfully!");
      setAlertType("success");
    } catch {
      setErrors((prev) => ({ ...prev, name: "An error occurred while updating name." }));
    }
  };

  const handleUpdateEmail = async () => {
    const newErrors = { newEmail: "", confirmNewEmail: "" };

    if (!newEmail.trim()) newErrors.newEmail = "New email is required.";
    if (!confirmNewEmail.trim()) newErrors.confirmNewEmail = "Confirm email is required.";
    if (newEmail !== confirmNewEmail) newErrors.confirmNewEmail = "Emails do not match.";

    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const response = await fetch("http://localhost:5000/api/profile/update-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail }),
      });

      if (!response.ok) throw new Error("Email update failed!");
      setAlertMessage("Email updated successfully!");
      setAlertType("success");
    } catch {
      setErrors((prev) => ({ ...prev, newEmail: "An error occurred while updating your email." }));
    }
  };

  const handleUpdatePassword = async () => {
    const newErrors = { newPassword: "", confirmPassword: "" };

    if (!newPassword.match(/(?=.*[A-Z])(?=.*[0-9!@#$%^&*()\-=_+])(?=.{8,})/)) {
      newErrors.newPassword = "Password must have an uppercase letter, a number/symbol, and be at least 8 characters.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.values(newErrors).some((error) => error)) return;

    try {
      const response = await fetch("http://localhost:5000/api/profile/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) throw new Error("Password update failed!");
      setAlertMessage("Password updated successfully!");
      setAlertType("success");
    } catch {
      setErrors((prev) => ({ ...prev, newPassword: "An error occurred while updating your password." }));
    }
  };

  const handleDeleteAccount = () => setIsModalOpen(true);

  const confirmDelete = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/profile/delete-account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete account");

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch {
      setAlertMessage("An error occurred while deleting your account.");
      setAlertType("success");
    }
  };

  return (
    <div className="bg-neutral min-h-screen flex items-center justify-center text-soft-beige p-6">
      <div className="bg-dark p-8 mt-10 mb-10 rounded-2xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Profile Settings</h1>

        {alertType && <Alert message={alertMessage} type={alertType} onClose={() => setAlertType(null)} />}

        <h2 className="text-xl font-semibold text-mutedlilac mt-6 mb-2">Change Name</h2>
        <InputField value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" error={errors.name} />
        <Button variant="update" className="mt-3 w-full py-3" onClick={handleUpdateName}>Update</Button>

        <h2 className="text-xl font-semibold text-mutedlilac mt-10 mb-2">Change Email</h2>
        <InputField type="email" value={currentEmail} disabled placeholder="Current Email" />
        <InputField type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" error={errors.newEmail} />
        <InputField type="email" value={confirmNewEmail} onChange={(e) => setConfirmNewEmail(e.target.value)} placeholder="Confirm New Email" error={errors.confirmNewEmail} />
        <Button variant="update" className="mt-3 w-full py-3" onClick={handleUpdateEmail}>Update Email</Button>

        <h2 className="text-xl font-semibold text-mutedlilac mt-10 mb-2">Change Password</h2>
        <InputField type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" error={errors.newPassword} />
        <InputField type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" error={errors.confirmPassword} />
        <Button variant="update" className="mt-3 mb-8 w-full py-3" onClick={handleUpdatePassword}>Update Password</Button>

        <div className="mt-8">
          <Button variant="delete" className="w-full py-3" onClick={handleDeleteAccount}>Delete Account</Button>
        </div>
      </div>

      <Modal
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
