import React from "react";
import { Formik, FormikValues, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { v4 as uuid4 } from "uuid";

import { REQUIRED_FIELD } from "../utils/constants";
import InputField from "./InputField";
import ImagePicker from "./ImagePicker";
import TextareaField from "./TextareaField";
import { Button } from "./Buttons";
import { isEmpty } from "../utils/helperfuntions";
import { addNewsArticle, editNewsArticle } from "../services/ArticleService";
import { NewsArticle } from "../pages/home/types";
import { useData } from "../contexts/DataContext";
import { User } from "../services/UserService";

interface ArticleFormProps {
  close: () => void;
  user?: User | null;
  initValues: FormikValues;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  close,
  user,
  initValues,
}) => {
  const { addArticle, editArticle } = useData();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(REQUIRED_FIELD),
    description: Yup.string().required(REQUIRED_FIELD),
    url: Yup.string().url("Must be a valid URL").required("Required field"),
    urlToImage: Yup.string().required(REQUIRED_FIELD),
  });

  const handleSubmit = async (values: FormikValues) => {
    try {
      if (isEmpty(initValues)) {
        const newArticle = {
          ...values,
          id: uuid4(),
          author: user?.fullName,
          publishedAt: moment().utc().toISOString(),
        };
        await addNewsArticle(newArticle as NewsArticle);
        addArticle(newArticle as NewsArticle);
      } else {
        await editNewsArticle(values as NewsArticle);
        editArticle(values.id, values as NewsArticle);
      }
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <div className="flex justify-start">
            <ImagePicker name="urlToImage" />
          </div>
          <InputField type="text" name="title" label="Title" />
          <InputField type="text" name="url" label="Article URL" />
          <TextareaField name="description" label="Description" rows={8} />
          <footer className="sticky bottom-0 bg-white py-3 border-t">
            <div className="flex justify-end gap-2">
              <Button.Secondary
                className="w-[100px]"
                type="button"
                onClick={close}
              >
                Cancel
              </Button.Secondary>
              <Button className="w-[100px]" type="submit">
                {isEmpty(initValues) ? "Publish" : "Update"}
              </Button>
            </div>
          </footer>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
