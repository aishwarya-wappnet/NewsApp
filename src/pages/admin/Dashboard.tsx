import { useEffect } from "react";
import styled from "styled-components";
import { fetchUsers } from "../../services/UserService";
import { User } from "lucide-react";
import { useData } from "../../contexts/DataContext";
import { fetchNews } from "../../services/NewsService";

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 114px;
  border-radius: 2px;
  color: white;
  text-align: center;
  font-weight: bold;
  flex-direction: column;
  padding: 1rem;
`;

const ColorCard = styled(Card)`
  background-color: ${(props) => props.color};
`;

const Dashboard = () => {
  const { users, setAllUsers, setAllArticles } = useData();
  useEffect(() => {
    getUsers();
    getArticles();
  }, []);

  const getUsers = async () => {
    const response = await fetchUsers();
    setAllUsers(response);
  };

  const getArticles = async () => {
    const response = await fetchNews();
    setAllArticles(response);
  };

  return (
    <div className="flex gap-3">
      <ColorCard color="rgb(23, 162, 184)">
        <div className="flex justify-center items-center gap-8">
          <User width={50} height={50} />
          <div>{users?.length}</div>
        </div>
      </ColorCard>
      <ColorCard color="rgb(40, 167, 69)">
        <h1>Articles</h1>
        <p>123</p>
      </ColorCard>
    </div>
  );
};

export default Dashboard;
