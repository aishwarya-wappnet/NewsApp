import { ErrorMessage } from "formik";

const ErrorMsg = ({ name }: { name: string }) => {
  return (
    <ErrorMessage
      component="div"
      name={name}
      className="text-sm text-red-500 mt-1 font-normal"
    />
  );
};

export default ErrorMsg;
