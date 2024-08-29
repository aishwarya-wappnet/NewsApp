import { ReactNode, useState } from "react";
import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react";

import ErrorMsg from "./ErrorMsg";

type InputProps = {
  type: string;
  name: string;
  label?: string;
  icon?: ReactNode;
};

const InputField = ({ type, name, label, icon }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name}>{label}</label>
      <div className="flex justify-center items-center relative mt-1">
        {icon && (
          <div className="p-2 border h-10 border-gray-300 rounded-l-sm">
            {icon}
          </div>
        )}
        <Field
          name={name}
          type={isPasswordField && showPassword ? "text" : type}
          className={`form-control ${icon ? "rounded-r-sm" : "rounded-sm"}`}
          autocomplete="off"
        />
        {isPasswordField && (
          <button
            type="button"
            className="absolute right-0 pr-3"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <Eye width={20} className="icon" />
            ) : (
              <EyeOff width={20} className="icon" />
            )}
          </button>
        )}
      </div>
      <ErrorMsg name={name} />
    </div>
  );
};

export default InputField;
