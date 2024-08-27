import { Field } from "formik";
import ErrorMsg from "./ErrorMsg";

type TextareaProps = {
  name: string;
  label?: string;
  rows?: number;
  cols?: number;
};

const TextareaField = ({ name, label, rows = 4, cols = 50 }: TextareaProps) => {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name}>{label}</label>
      <Field
        as="textarea"
        name={name}
        rows={rows}
        cols={cols}
        className="form-control mt-1 h-full"
        autocomplete="off"
      />
      <ErrorMsg name={name} />
    </div>
  );
};

export default TextareaField;
