import React from "react";
import { cn } from "../../utils/utils";
import Button from "../UI/Button";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const alertStyles = {
  success: "bg-green-50 text-green-800 border-green-600",
  error: "bg-red-50 text-red-800 border-red-600",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-600",
  info: "bg-blue-50 text-blue-800 border-blue-600",
};

const Alert: React.FC<AlertProps> = ({ type = "info", message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={cn(
          "p-6 rounded-lg border-2 shadow-xl w-full max-w-lg text-center text-lg font-semibold transition-all transform",
          alertStyles[type],
          "scale-100 opacity-100 hover:scale-105 hover:opacity-90"
        )}
      >
        <p className="mb-4">{message}</p>

        {onClose && (
          <Button
            variant="close"
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg text-lg font-medium text-white bg-gray-700 hover:bg-gray-800 transition-all"
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default Alert;
