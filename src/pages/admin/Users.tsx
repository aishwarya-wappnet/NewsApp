import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import Table from "../../components/Table";
import { useData } from "../../contexts/DataContext";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers,
  User,
} from "../../services/UserService";
import { Button } from "../../components/Buttons";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import { REQUIRED_FIELD } from "../../utils/constants";
import { isEmpty } from "../../utils/helperfuntions";

const userCols = [
  {
    header: "Full Name",
    key: "fullName",
    width: "50%",
  },
  {
    header: "Email",
    key: "email",
    width: "50%",
  },
];

const Users = () => {
  const { users, setAllUsers } = useData();
  const [showUserForm, setShowUserForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetchUsers();
    setAllUsers(response);
  };

  const handleUserForm = () => {
    setShowUserForm((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    getUsers();
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(REQUIRED_FIELD),
    email: Yup.string().email("Invalid email address").required(REQUIRED_FIELD),
    password: Yup.string().required(REQUIRED_FIELD),
  });

  return (
    <>
      <Modal
        show={showUserForm}
        close={handleUserForm}
        outsideClose={true}
        width="500px"
        title={isEmpty(initialValues) ? "Add User" : "Edit User"}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (isEmpty(initialValues)) await addUser(values as User);
            else await editUser(values as User);
            handleUserForm();
            getUsers();
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <InputField type="text" name="fullName" label="Full Name" />
              <InputField type="email" name="email" label="Email" />
              <InputField type="password" name="password" label="Password" />
              <div className="flex justify-end">
                <Button type="submit" className="my-2">
                  {isEmpty(initialValues) ? "Add User" : "Update User"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <div className="flex justify-end">
        <Button className="my-2" onClick={handleUserForm}>
          Add User
        </Button>
      </div>
      <Table
        columns={userCols}
        data={users}
        onEdit={(values: unknown) => {
          setInitialValues(values as User);
          handleUserForm();
        }}
        onDelete={(values: unknown) => {
          handleDelete(values?.id as string);
        }}
      />
    </>
  );
};

export default Users;
