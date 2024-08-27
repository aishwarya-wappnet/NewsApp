import styled from "styled-components";
import { NewsArticle } from "../pages/home/types";
import { Link } from "react-router-dom";

interface NewsBlock {
  image: string;
  title: string;
  content: string;
}

const NewsBlockContainer = styled.div`
  margin: 20px 0;
  background-color: #f3f3f3;
  border-radius: 2px;
  opacity: 0;
  padding: 1rem;
  transform: translateY(20px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  height: 200px;
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  img {
    object-fit: cover;
    min-width: 300px;
    height: 168px;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    height: 100%;
    img {
      width: 100%;
      height: 250px;
    }
  }
`;

const NewsBlock = ({ newsArticle }: { newsArticle: NewsArticle }) => {
  const { description, urlToImage, title, url } = newsArticle;
  return (
    <NewsBlockContainer data-aos="fade-right">
      <div className="flex md:flex-row gap-3 justify-between flex-col-reverse">
        <div className="flex flex-col">
          <h3 className="font-medium">{title}</h3>
          <p className="mt-2">
            {description}
            <Link to={url} className="text-primary" target="_blank">
              &nbsp;Read more
            </Link>
          </p>
        </div>
        <img src={urlToImage} alt={title} loading="lazy" />
      </div>
    </NewsBlockContainer>
  );
};

export default NewsBlock;
