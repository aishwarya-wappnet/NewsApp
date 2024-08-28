import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { Newspaper, User } from "lucide-react";
import { fetchUsers } from "../../services/UserService";
import { useData } from "../../contexts/DataContext";
import { fetchNews } from "../../services/ArticleService";
import { Chart } from "chart.js";
import LineChart from "../../components/LineChart";
import "react-datepicker/dist/react-datepicker.css";
import { NewsArticle } from "../home/types";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 114px;
  border-radius: 2px;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 200px;
`;

const ColorCard = styled(Card)`
  background-color: ${(props) => props.color};
`;

const Dashboard = () => {
  const { users, articles, setAllUsers, setAllArticles, startDate, endDate } =
    useData();
  const userChartRef = useRef<Chart<"line">>(null);
  const articlesChartRef = useRef<Chart<"line">>(null);

  useEffect(() => {
    return () => {
      if (userChartRef.current) {
        userChartRef.current.destroy();
      }
      if (articlesChartRef.current) {
        articlesChartRef.current.destroy();
      }
    };
  }, []);

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

  const createChartData = (
    counts: number[],
    labels: string[],
    label: string
  ) => ({
    labels, // Use the provided labels directly
    datasets: [
      {
        label,
        data: counts,
        borderColor:
          label === "Users" ? "rgb(23, 162, 184)" : "rgb(40, 167, 69)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 2,
      },
    ],
  });

  const getDataForChart = (data: User[] | NewsArticle[]) => {
    const start = startDate || new Date();
    const end = endDate || new Date();
    const counts: number[] = [];
    const labels: string[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const currentDate = new Date(d);
      labels.push(
        currentDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })
      );
      counts.push(0);
    }

    data.forEach((item: any) => {
      const date = new Date(item.createdAt || item.publishedAt);

      if (date >= start && date <= end) {
        const dayDiff = Math.floor(
          (date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dayDiff >= 0 && dayDiff < counts.length) {
          counts[dayDiff]++;
        }
      }
    });

    return { counts, labels };
  };

  const { counts: userCounts, labels: userLabels } = useMemo(
    () => getDataForChart(users),
    [users, startDate, endDate]
  );
  const { counts: articlesCounts, labels: articlesLabels } = useMemo(
    () => getDataForChart(articles),
    [articles, startDate, endDate]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <ColorCard color="rgb(23, 162, 184)">
          <div className="flex flex-col justify-center items-center gap-2">
            <User width={50} height={50} />
            <p>Users</p>
          </div>
          <p className="text-2xl">{users?.length}</p>
        </ColorCard>
        <ColorCard color="rgb(40, 167, 69)">
          <div className="flex flex-col justify-center items-center gap-2">
            <Newspaper width={50} height={50} />
            <p>Articles</p>
          </div>
          <p className="text-2xl">{articles?.length}</p>
        </ColorCard>
      </div>
      <div className="flex gap-3 md:flex-row flex-col">
        <LineChart
          chartRef={userChartRef}
          chartData={createChartData(userCounts, userLabels, "Users")}
          title="Users"
        />
        <LineChart
          chartRef={articlesChartRef}
          chartData={createChartData(
            articlesCounts,
            articlesLabels,
            "Articles"
          )}
          title="Articles"
        />
      </div>
    </div>
  );
};

export default Dashboard;
