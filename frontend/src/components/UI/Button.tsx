import React from "react";
import { cn } from "../../utils/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "login"
    | "register"
    | "logout"
    | "delete"
    | "confirm"
    | "cancel"
    | "update"
    | "close"
    | "verify"
    | "reset";
}

const Button: React.FC<ButtonProps> = ({ variant = "login", className, children, ...props }) => {
  const baseStyles =
    "px-5 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg";

    const variantStyles = {
      login: "bg-primary text-button hover:bg-primary-light",
      register: "bg-secondary text-button hover:bg-secondary-light",
      logout: "bg-dark text-button hover:bg-neutral",
      delete: "bg-red text-button hover:bg-red-dark",
      confirm: "bg-accent text-button hover:bg-accent-light",
      cancel: "bg-gray-500 text-button hover:bg-gray-600",
      update: "bg-mutedlilac text-button hover:bg-mutedlilac-light",
      close: "bg-gray-400 text-button hover:bg-gray-500",
      verify: "bg-bluegray text-button hover:bg-bluegray-light",
      reset: "bg-softlilac text-button hover:bg-softlilac-light",
    };
    

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
