import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  getArticles,
  getTotalArticles,
} from "../../redux/reducers/articleReducer";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MEDIA_QUERY_L } from "../../constants/breakpoint";
import Loading from "../../components/Loading";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/id/1056/600");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 450px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

const ArticleList = styled.div`
  margin: 32px auto 64px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ${MEDIA_QUERY_L} {
    flex-direction: column;
  }
`;

const ArticleContainer = styled(Link)`
  display: flex;
  max-width: 800px;
  text-decoration: none;

  & + & {
    margin-top: 16px;
  }

  &:hover h3 {
    color: #5ebfb8;
  }

  &:hover div:before {
    background: radial-gradient(
      circle at center,
      rgb(0 0 0 / 25%),
      rgb(165 160 160 / 68%)
    );
  }
  ${MEDIA_QUERY_L} {
    flex-direction: column;
  }
`;

const ArticleImg = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 360px;
  height: 220px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgb(0 0 0 / 25%),
      rgb(0 0 0 / 68%)
    );
  }

  ${MEDIA_QUERY_L} {
    width: 100%;
  }
`;

const ArticleTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 12px;
  color: #5d5d5d;
`;

const ArticleAuthor = styled.div`
  margin-top: 6px;
  width: 100%;
  color: #a5a5a5;
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #a5a5a5;
  width: 440px;
  padding: 16px 20px;
  background: #faf7f3;

  ${MEDIA_QUERY_L} {
    width: 100%;
    padding-top: 16px;
  }
`;

const ArticleBody = styled.div`
  white-space: break-spaces;
  margin-top: 6px;
`;

const Time = styled.div`
  color: #f45f70;
  margin-top: 6px;
  width: 100%;
`;
const Error = styled.div`
  color: red;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;
const PageBtn = styled.div`
  cursor: pointer;
`;
const CurrentPage = styled.div`
  padding: 0 16px;
`;
const Page = styled.div`
  margin: 16px 0 32px;
  display: flex;
  justify-content: center;
`;

const textLength = (obj, len) => {
  if (obj.length > len) {
    let word = obj.substring(0, len - 1) + "...";
    return word;
  }
};

const Article = ({ title, time, id, body, nickname }) => {
  return (
    <ArticleContainer to={`/article/${id}`}>
      <ArticleImg
        style={{
          backgroundImage: `url("https://picsum.photos/600")`,
        }}
      />
      <ArticleInfo>
        <div>
          <ArticleTitle>{title}</ArticleTitle>
          <Time>{time}</Time>
          <ArticleBody>{textLength(body, 50)}</ArticleBody>
        </div>
        <ArticleAuthor>by {nickname}</ArticleAuthor>
      </ArticleInfo>
    </ArticleContainer>
  );
};

export default function HomePage() {
  const dispatch = useDispatch();
  const articles = useSelector((store) => store.article.articles);
  const articlesError = useSelector((store) => store.article.articlesError);
  const totalArticles = useSelector((store) => store.article.totalArticles);
  const isLoading = useSelector((store) => store.article.isLoadingArticles);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((totalArticles - 1) / 9);

  useEffect(() => {
    dispatch(getArticles(page));
    dispatch(getTotalArticles());
  }, [dispatch, page]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [page]);

  const handlePrevBtnClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextBtnClick = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <>
      {isLoading && <Loading>Loading...</Loading>}
      <Banner>
        <Title>All Articles</Title>
      </Banner>
      {articlesError && <Error>{articlesError.toString()}</Error>}
      <ArticleList>
        {articles &&
          articles.map((article) => (
            <Article
              key={article.id}
              title={article.title}
              body={article.body}
              nickname={article.user.nickname}
              time={new Date(article.createdAt).toLocaleDateString()}
              id={article.id}
            />
          ))}
      </ArticleList>
      <Pagination>
        {!(page === 1) && (
          <PageBtn onClick={handlePrevBtnClick}>上一頁</PageBtn>
        )}
        <CurrentPage>{page}</CurrentPage>
        {!(page === totalPages) && (
          <PageBtn onClick={handleNextBtnClick}>下一頁</PageBtn>
        )}
      </Pagination>
      <Page>
        {page} / {totalPages}
      </Page>
    </>
  );
}

Article.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.number,
  body: PropTypes.string,
  nickname: PropTypes.string,
};
