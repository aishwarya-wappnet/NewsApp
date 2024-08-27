import { useEffect, useState } from "react";

import Table from "../../components/Table";
import { useData } from "../../contexts/DataContext";
import { deleteUser, User } from "../../services/UserService";
import { Button } from "../../components/Buttons";
import Modal from "../../components/Modal";
import { isEmpty } from "../../utils/helperfuntions";
import { fetchNews } from "../../services/NewsService";
import ArticleForm from "../../components/ArticleForm";
import { NewsArticle } from "../home/types";

const articlesCols = [
  {
    header: "Title",
    key: "title",
    width: "40%",
  },
  {
    header: "Author",
    key: "author",
    width: "10%",
  },
  {
    header: "Publish Date",
    key: "publishedAt",
    date: true,
    width: "35%",
  },
  {
    header: "Article URL",
    key: "url",
    url: true,
    width: "20%",
  },
];

const Users = () => {
  const { articles, setAllArticles } = useData();
  const [showForm, setShowForm] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    url: "",
    urlToImage: "",
  });
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const response = await fetchNews();
    setAllArticles(response);
  };

  const handleArticleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
  };

  return (
    <>
      <Modal
        show={showForm}
        close={handleArticleForm}
        outsideClose={true}
        title={isEmpty(initialValues) ? "Add Article" : "Edit Article"}
      >
        <ArticleForm close={handleArticleForm} initValues={initialValues} />
      </Modal>
      <div className="flex justify-end">
        <Button className="my-2" onClick={handleArticleForm}>
          Add Article
        </Button>
      </div>
      <Table
        columns={articlesCols}
        data={articles}
        onEdit={(values: unknown) => {
          setInitialValues(values as NewsArticle);
          handleArticleForm();
        }}
        onDelete={(values: unknown) => {
          handleDelete(values?.id as string);
        }}
      />
    </>
  );
};

export default Users;
