import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import {
  ADMIN_TOKEN,
  INVALID_CREDS,
  LOGIN_SUCCESS,
  REQUIRED_FIELD,
  USER,
  USER_NOT_FOUND,
} from "../utils/constants";
import InputField from "./InputField";
import { Button } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { setItem } from "../utils/helperfuntions";
import { fetchUsers, User } from "../services/UserService";
import { useUserAuth } from "../contexts/UserContext";

const Login = ({
  isAdmin,
  close,
}: {
  isAdmin?: boolean;
  close?: () => void;
}) => {
  const navigate = useNavigate();
  const { login } = useUserAuth();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required(REQUIRED_FIELD),
    password: Yup.string().required(REQUIRED_FIELD),
  });
  

  const handleSubmit = async (
    values: FormikValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (isAdmin) {
      if (
        values.email === import.meta.env.VITE_APP_ADMIN_EMAIL &&
        values.password === import.meta.env.VITE_APP_ADMIN_PASSWORD
      ) {
        setItem({ key: ADMIN_TOKEN, value: uuidv4() });
        navigate("/admin/dashboard");
        toast.success(LOGIN_SUCCESS);
      } else {
        toast.error(INVALID_CREDS);
      }
    } else {
      try {
        setSubmitting(true);
        const response = await fetchUsers();
        const user = response?.filter(
          (user: User) => user?.email === values?.email
        );

        if (user?.length === 0) {
          toast.error(USER_NOT_FOUND);
        } else if (user?.length > 0) {
          if (user[0]?.password === values?.password) {
            if (close) close();
            toast.success(LOGIN_SUCCESS);
            setItem({
              key: USER,
              value: JSON.stringify({ ...user, token: uuidv4() }),
            });
            login();
          } else {
            toast.error(INVALID_CREDS);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Please try again");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="pb-3">
          <InputField type="text" name="email" label="Email" />
          <InputField type="password" name="password" label="Password" />
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
