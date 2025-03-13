import React from "react";

interface InputFieldProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean; 
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ type = "text", value, placeholder, onChange, error, disabled }) => {
  return (
    <div className="w-full text-center">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-2 rounded bg-soft-beige text-background mt-1 text-center border border-transparent focus:border-primary outline-none transition-all"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
