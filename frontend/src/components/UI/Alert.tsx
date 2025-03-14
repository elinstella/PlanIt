import React from "react";
import { cn } from "../../utils/utils";
import Button from "../UI/Button";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const alertStyles = {
  success: "bg-green-100 text-green-900 border-green-800",
  error: "bg-red-100 text-red-900 border-red-800",
  warning: "bg-yellow-100 text-yellow-900 border-yellow-800",
  info: "bg-blue-100 text-blue-900 border-blue-800",
};

const Alert: React.FC<AlertProps> = ({ type = "info", message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div
        className={cn(
          "p-6 rounded-2xl border-2 shadow-lg w-full max-w-sm text-center text-lg font-semibold",
          alertStyles[type]
        )}
      >
        <p className="mb-4">{message}</p>

        {onClose && (
          <Button
            variant="close"
            onClick={onClose}
            className="w-full py-2 rounded-lg text-lg font-medium transition-all"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default Alert;
