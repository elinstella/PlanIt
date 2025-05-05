// TermsModal.tsx
import React from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Read This Before You Register</h2>
        
        {/* Scrollable content section */}
        <div className="text-sm text-gray-800 mb-4 max-h-96 overflow-y-auto">
          <p><strong>The Service is Completely Free:</strong> Our service is free to use. There are no hidden fees, subscriptions, or payments required to get started.</p>
          <p><strong>We Use MongoDB for Data Storage:</strong> To handle and store your data, we use MongoDB as our database. By registering, you agree that your information will be processed according to the terms and policies of MongoDB.</p>
          <p><strong>Privacy and Data Protection:</strong> We care about your privacy. Your data will be handled with the utmost respect and in accordance with our Privacy Policy. We recommend reading through this carefully before registering.</p>
          <p><strong>Possible Future Payments:</strong> If the service transitions to a paid model in the future, we will update our terms of service and privacy policy. You will be notified of these changes before they take effect.</p>
          <p><strong>Terms of Use:</strong> By registering, you agree to our Terms of Service. Please read them carefully to understand how our service works and your rights and responsibilities as a user.</p>

          <h3 className="text-xl font-semibold mt-6 mb-4">Terms of Use for PlanIt</h3>
          <p><strong>Purpose of the Service:</strong> PlanIt helps users create and manage their daily tasks, reminders, and to-do lists. By registering and using the app, you agree to these terms.</p>
          <p><strong>Registration and Account Information:</strong> To use the app, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your login credentials and for updating your information as needed.</p>
          <p><strong>Use of the App:</strong> You may use the app for personal purposes only and are responsible for ensuring that you do not upload or share illegal or harmful content.</p>
          <p><strong>Privacy:</strong> We collect and store your personal information in accordance with our Privacy Policy. We strive to protect your data, but we cannot guarantee complete security.</p>
          <p><strong>Payment and Costs:</strong> The app is free to use, but some premium features may be available for a fee. If payments become necessary in the future, we will update the terms of service and notify you in advance.</p>
          <p><strong>Limitation of Liability:</strong> The app is provided "as is," and we are not responsible for any damage that may occur through its use. We make no guarantees regarding the app’s reliability or availability.</p>
          <p><strong>Changes to Terms:</strong> We reserve the right to change these terms of use at any time. You will be notified of any significant changes before they take effect.</p>
          <p><strong>Account Termination:</strong> You may terminate your account at any time by contacting us. Upon termination, your data may be permanently deleted, depending on our policy and legal requirements.</p>
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="bg-primary text-white px-4 py-2 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
