import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { NewsArticle } from "../pages/home/types";
import { User } from "../services/UserService";
import moment from "moment";

interface DataContextInterface {
  articles: NewsArticle[] | undefined;
  addArticle: (article: NewsArticle) => void;
  setAllArticles: (articles: NewsArticle[]) => void;
  editArticle: (id: string, data: NewsArticle) => void;
  deleteArticle: (id: string) => void;
  users: User[] | undefined;
  addUser: (user: User) => void;
  setAllUsers: (users: User[]) => void;
  editUser: (id: string, data: User) => void;
  deleteUser: (id: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  handleStartDate: (date: Date) => void;
  handleEndDate: (date: Date) => void;
}

const DataContext = createContext<DataContextInterface | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    const now = moment();
    const startOfWeek = now.startOf("week").toDate();
    const endOfWeek = now.endOf("week").toDate();
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
  }, []);

  const addArticle = (article: NewsArticle) => {
    if (article) setArticles((prev) => [article, ...prev]);
  };

  const setAllArticles = (articles: NewsArticle[]) => {
    setArticles(articles);
  };

  const editArticle = (id: string, data: NewsArticle) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, ...data } : article
      )
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const addUser = (userData: User) => {
    if (userData) setUsers((prev) => [userData, ...prev]);
  };

  const setAllUsers = (allUsers: User[]) => {
    setUsers(allUsers);
  };

  const editUser = (id: string, data: User) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, ...data } : user))
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleStartDate = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDate = (date: Date) => {
    setEndDate(date);
  };

  const value = useMemo(
    () => ({
      articles,
      addArticle,
      setAllArticles,
      editArticle,
      deleteArticle,
      users,
      setAllUsers,
      addUser,
      editUser,
      deleteUser,
      startDate,
      endDate,
      handleEndDate,
      handleStartDate,
    }),
    [articles, users, startDate, endDate]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the ArtcilesContext
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
