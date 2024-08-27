import { Field } from "formik";
import ErrorMsg from "./ErrorMsg";

type InputProps = {
  type: string;
  name: string;
  label?: string;
};

const InputField = ({ type, name, label }: InputProps) => {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name}>{label}</label>
      <Field
        name={name}
        type={type}
        className="form-control mt-1"
        autocomplete="off"
      />
      <ErrorMsg name={name} />
    </div>
  );
};

export default InputField;
