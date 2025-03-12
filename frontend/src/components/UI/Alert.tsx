import React from "react";
import { cn } from "../../utils/utils";
import Button from "../UI/Button";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const alertStyles = {
  success: "text-green-800 border-green-900",
  error: "text-red-800 border-red-900",
  warning: "text-yellow-800 border-yellow-900",
  info: "text-blue-800 border-blue-900",
};

const Alert: React.FC<AlertProps> = ({ type = "info", message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-12">
      <div className={cn("p-8 rounded-2xl  text-center text-xl font-semibold bg-opacity-90", "bg-[#F6E9E0]", alertStyles[type])}>
        <p className="mb-4">{message}</p>
        {onClose && (
          <div className="flex justify-center">
            <Button variant="close" onClick={onClose} className="px-6 py-3 text-lg font-bold">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
