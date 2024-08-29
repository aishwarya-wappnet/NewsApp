import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { v4 as uuid4 } from "uuid";
import moment from "moment";
import { Plus } from "lucide-react";

import Table from "../../components/Table";
import { useData } from "../../contexts/DataContext";
import {
  addNewUser,
  delUser,
  updateUser,
  fetchUsers,
  User,
} from "../../services/UserService";
import { Button } from "../../components/Buttons";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import { REQUIRED_FIELD } from "../../utils/constants";
import { isEmpty } from "../../utils/helperfuntions";

const initValues = {
  id: "",
  fullName: "",
  email: "",
  password: "",
  createdAt: "",
};

const userCols = [
  {
    header: "Full Name",
    key: "fullName",
    width: "30%",
  },
  {
    header: "Email",
    key: "email",
    width: "30%",
  },
  {
    header: "Created At",
    key: "createdAt",
    width: "30%",
    date: true,
  },
];

const Users = () => {
  const { users, setAllUsers, deleteUser, addUser, editUser } = useData();
  const [showUserForm, setShowUserForm] = useState(false);
  const [initialValues, setInitialValues] = useState(initValues);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetchUsers();
    setAllUsers(response.reverse());
  };

  const handleUserForm = () => {
    setShowUserForm((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    deleteUser(id);
    await delUser(id);
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
        close={() => {
          setInitialValues(initValues);
          handleUserForm();
        }}
        outsideClose={true}
        width="500px"
        title={isEmpty(initialValues) ? "Add User" : "Edit User"}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            if (isEmpty(initialValues)) {
              addUser(values as User);
              values["id"] = uuid4();
              values["createdAt"] = moment().utc().toISOString();
              await addNewUser(values as User);
            } else {
              editUser(values.id, values as User);
              await updateUser(values as User);
            }
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
              <div className="flex items-center justify-end gap-2">
                <Button.Secondary
                  className="w-[100px]"
                  type="button"
                  onClick={() => {
                    setInitialValues(initValues);
                    handleUserForm();
                  }}
                >
                  Cancel
                </Button.Secondary>
                <Button type="submit" className="my-2 w-[100px]">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
      <div className="flex justify-end">
        <Button className="mt-2 mb-4" onClick={handleUserForm}>
          <Plus width={20} />
          &nbsp;Add User
        </Button>
      </div>
      <Table
        columns={userCols}
        data={users || []}
        onEdit={(values: unknown) => {
          setInitialValues(values as User);
          handleUserForm();
        }}
        onDelete={(values: unknown) => {
          handleDelete((values as User).id);
        }}
      />
    </>
  );
};

export default Users;
