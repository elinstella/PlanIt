import React, { useState } from "react";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import Modal from "../components/UI/Modal";
import Alert from "../components/UI/Alert"; 

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
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

  const handleUpdateName = () => {
    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name field cannot be empty." }));
      return;
    }
    setErrors((prev) => ({ ...prev, name: "" }));
    setAlertMessage("Name updated successfully!");
    setAlertType("success");
  };

  const handleUpdateEmail = async () => {
    const newErrors = { newEmail: "", confirmNewEmail: "" };
  
    if (!newEmail.trim()) newErrors.newEmail = "New email is required.";
    if (!confirmNewEmail.trim()) newErrors.confirmNewEmail = "Confirm email is required.";
    if (newEmail !== confirmNewEmail) newErrors.confirmNewEmail = "Emails do not match.";
  
    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.values(newErrors).some((error) => error)) return;
  
    try {
      const response = await fetch("/api/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail }),
      });
  
      if (!response.ok) throw new Error("Email update failed!");
  
      setAlertMessage("Email updated successfully!");
      setAlertType("success");
    } catch {
      setErrors((prev) => ({ ...prev, newEmail: "An error occurred while updating your email." }));
    }
  };
  



  const handleUpdatePassword = () => {
    const newErrors = { newPassword: "", confirmPassword: "" };
  
    if (!newPassword.match(/(?=.*[A-Z])(?=.*[0-9!@#$%^&*()\-=_+])(?=.{8,})/)) {
      newErrors.newPassword = "Password must have an uppercase letter, a number/symbol, and be at least 8 characters.";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
  
    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.values(newErrors).some((error) => error)) return;
  
    setAlertMessage("Password updated successfully!");
    setAlertType("success");
  };
  



  const handleDeleteAccount = () => setIsModalOpen(true);
  const confirmDelete = () => {
    setAlertMessage("Account deleted.");
    setAlertType("success");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center text-soft-beige p-6">
      <div className="bg-dark-purple p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-primary">Profile Settings</h1>

        {alertType && <Alert message={alertMessage} type={alertType} onClose={() => setAlertType(null)} />}

        <h2 className="text-lg font-semibold text-lavender mt-6">Change Name</h2>
        <InputField value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" error={errors.name} />
        <Button variant="update" className="mt-3 w-full" onClick={handleUpdateName}>Update</Button>

        <h2 className="text-lg font-semibold text-lavender mt-6">Change Email</h2>
        <InputField type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" error={errors.newEmail} />
        <InputField type="email" value={confirmNewEmail} onChange={(e) => setConfirmNewEmail(e.target.value)} placeholder="Confirm New Email" error={errors.confirmNewEmail} />
        <Button variant="update" className="mt-3 w-full" onClick={handleUpdateEmail}>Update Email</Button>

        <h2 className="text-lg font-semibold text-lavender mt-6">Change Password</h2>
        <InputField type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" error={errors.newPassword} />
        <p className="text-xs text-soft-beige mt-1">Password must contain at least one uppercase letter, one number or symbol, and be at least 8 characters long.</p>
        <InputField type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" error={errors.confirmPassword} />
        <Button variant="update" className="mt-3 w-full" onClick={handleUpdatePassword}>Update Password</Button>

        <div className="mt-6">
          <Button variant="delete" className="w-full" onClick={handleDeleteAccount}>Delete Account</Button>
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
