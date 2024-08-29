import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Table from "../../components/Table";
import { useData } from "../../contexts/DataContext";
import { Button } from "../../components/Buttons";
import Modal from "../../components/Modal";
import { isEmpty } from "../../utils/helperfuntions";
import { deleteNewsArticle, fetchNews } from "../../services/ArticleService";
import ArticleForm from "../../components/ArticleForm";
import { NewsArticle } from "../home/types";

const articlesCols = [
  {
    header: "Title",
    key: "title",
    width: "45%",
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
    width: "30%",
    nowrap: true,
  },
  {
    header: "Article URL",
    key: "url",
    url: true,
    width: "20%",
  },
];

const Users = () => {
  const { articles, setAllArticles, deleteArticle } = useData();
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
    setAllArticles(response.reverse());
  };

  const handleArticleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    await deleteNewsArticle(id);
    deleteArticle(id);
  };

  return (
    <>
      <Modal
        show={showForm}
        close={handleArticleForm}
        outsideClose={true}
        title={isEmpty(initialValues) ? "Publish News" : "Edit News"}
      >
        <ArticleForm
          close={() => {
            setInitialValues({
              title: "",
              description: "",
              url: "",
              urlToImage: "",
            });
            handleArticleForm();
          }}
          initValues={initialValues}
        />
      </Modal>
      <div className="flex justify-end">
        <Button className="mt-2 mb-4" onClick={handleArticleForm}>
          <Plus width={20} />
          &nbsp;Publish News
        </Button>
      </div>
      <Table
        columns={articlesCols}
        data={articles || []}
        onEdit={(values: unknown) => {
          setInitialValues(values as NewsArticle);
          handleArticleForm();
        }}
        onDelete={(values: unknown) => {
          handleDelete((values as NewsArticle).id);
        }}
      />
    </>
  );
};

export default Users;
