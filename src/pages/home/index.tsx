import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import ImageSlider from "../../components/ImageSlider";
import { slides } from "../../data/slides";
import NewsBlock from "../../components/NewsBlock";
import { fetchNews, fetchRandomNews } from "../../services/ArticleService";
import { NewsArticle } from "./types";
import Logo from "../../components/Logo";
import { UserAuthProvider } from "../../contexts/UserContext";
import UserNavbar from "./UserNavbar";
import { useData } from "../../contexts/DataContext";
import { debounce } from "../../utils/helperfuntions";

const Container = styled.div`
  max-width: 900px;
  margin: auto;
  @media (max-width: 900px) {
    width: 100%;
    padding: 1rem;
  }
`;

const NewsContainer = styled.div``;

const Home = () => {
  const { setAllArticles, articles, addArticle } = useData();
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const newNews = setTimeout(async () => {
      const newArticle: NewsArticle = await fetchRandomNews();
      if (newArticle) addArticle(newArticle);
    }, 5000);
    return () => {
      clearTimeout(newNews);
    };
  }, []);

  const loadMoreArticles = async () => {
    await fetchArticles();
    setVisibleCount((prevCount) => prevCount + 10); // Load 10 more articles
  };

  // Debounced handleScroll function
  const handleScroll = useCallback(
    debounce(() => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrolled = window.innerHeight + window.scrollY;

      if (scrollableHeight - scrolled < 100) {
        loadMoreArticles();
      }
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const fetchArticles = async () => {
    const response = await fetchNews();
    if (Array.isArray(response)) {
      setAllArticles(response.reverse());
    }
  };

  return (
    <UserAuthProvider>
      {/* Header start */}
      <header className="flex justify-between items-center py-4 px-4 md:px-32 sticky top-0 z-10 bg-white text-black">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>
        <div className="font-bold">
          <UserNavbar />
        </div>
      </header>
      {/* Header end */}
      <Container>
        {/* Image slider start */}
        <div className="flex justify-center items-center">
          <ImageSlider slides={slides} />
        </div>
      </Container>
      {/* Image slider end */}
      {/* News feed start */}
      <NewsContainer>
        <Container>
          <div className="mt-16">
            <h1 className="text-primary font-bold pt-6">Latest News</h1>
            {articles
              ?.slice(0, visibleCount)
              .map((newsArticle: NewsArticle) => (
                <NewsBlock newsArticle={newsArticle} key={newsArticle.title} />
              ))}
          </div>
          {/* News feed end */}
        </Container>
      </NewsContainer>
    </UserAuthProvider>
  );
};

export default Home;
