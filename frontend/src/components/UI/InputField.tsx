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

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  disabled,
}) => {
  return (
    <div className="w-full text-center mt-0 mb-3"> {/* 🔹 Lagt till margin-top och margin-bottom */}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-3 rounded-lg bg-warmbeige text-background text-center border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 shadow-sm hover:shadow-md"
      />
      {error && <p className="text-rosebrown text-sm mt-2">{error}</p>}
    </div>
  );
};

export default InputField;
