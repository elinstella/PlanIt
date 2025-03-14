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
    login: "bg-primary text-warmbeige hover:bg-primary-light", // Mjuk orange
    register: "bg-secondary text-warmbeige hover:bg-secondary-light", // Varm brunorange
    logout: "bg-dark text-soft-beige hover:bg-neutral", // Mörk chokladbrun
    delete: "bg-red text-warmbeige hover:red-dark-900", // Mörkare röd
    confirm: "bg-accent text-soft-beige hover:bg-accent-light", // Jordig brun
    cancel: "bg-gray-500 text-white hover:bg-gray-600", // Mörkare grå
    update: "bg-mutedlilac text-background hover:bg-mutedlilac-light", // Dämpad lila-grå
    close: "bg-gray-400 text-white hover:bg-gray-500", // Grå knapp för att stänga modaler
    verify: "bg-bluegray text-warmbeige hover:bg-bluegray-light", // Mörk blågrå
    reset: "bg-softlilac text-warmbeige hover:bg-softlilac-light", // Mjuk lila-grå
  };

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
