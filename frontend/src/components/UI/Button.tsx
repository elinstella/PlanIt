import React from "react";
import { cn } from "../../utils/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "login" | "register" | "logout" | "delete" | "confirm" | "cancel" | "update" | "close";
}

const Button: React.FC<ButtonProps> = ({ variant = "login", className, children, ...props }) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-102 active:scale-98 shadow-md hover:shadow-lg";

  const variantStyles = {
    login: "bg-primary text-soft-beige hover:bg-[#5e3a8c]", // Mörkare lila
    register: "bg-warm-ocre text-background hover:bg-[#c47c2a]", // Mörkare orange
    logout: "bg-gray-600 text-soft-beige hover:bg-gray-700", // Mörkare grå
    delete: "bg-red-600 text-white hover:bg-red-800", // Mörkare röd
    confirm: "bg-dark-purple text-soft-beige hover:bg-[#351d4e]", // Mörkare lila
    cancel: "bg-gray-500 text-white hover:bg-gray-600", // Mörkare grå
    update: "bg-lavender text-background hover:bg-[#8f6fb3]", // Mörkare lavendel
    close: "bg-gray-400 text-white hover:bg-gray-500", // Grå knapp för att stänga modaler
  };

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;