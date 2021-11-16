import { useEffect, Fragment } from "react";
import styled from "styled-components";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  getArticle,
  deleteArticle,
  setArticleError,
} from "../../redux/reducers/articleReducer";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import MDEditor from "@uiw/react-md-editor";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/1200");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 350px;

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

const Box = styled.div`
  max-width: 800px;
  margin: 40px auto 0;
  text-align: right;
`;

const Edit = styled(Link)`
  background: #5ebfb8;
  border: 0;
  color: #fff;
  padding: 14px 20px;
  border-radius: 3px;
  font-size: 14px;
  text-decoration: none;
`;
const Delete = styled.button`
  background: #f45f70;
  border: 0;
  color: #fff;
  padding: 12px 20px;
  border-radius: 3px;
  margin-left: 12px;
  font-size: 14px;
  cursor: pointer;
`;

const ArticleText = styled.div`
  max-width: 800px;
  margin: 20px auto 40px;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  padding: 20px;
  white-space: break-spaces;
  background-color: #faf7f3;
  p {
    margin: 6px;
  }
`;

const Time = styled.div`
  text-align: right;
  margin-bottom: 16px;
`;

const Error = styled.div`
  color: red;
`;

export default function ArticlePage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user.user);
  const article = useSelector((store) => store.article.article);
  const articleError = useSelector((store) => store.article.articleError);
  const isLoading = useSelector((store) => store.article.isLoadingArticle);
  const newArticleResponse = useSelector(
    (store) => store.article.newArticleResponse
  );

  const handleDeleteArticle = (id) => {
    let deleteMessage = window.confirm("確定刪除文章？");
    if (deleteMessage) {
      dispatch(deleteArticle(history, id));
    }
  };

  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(setArticleError(""));
  }, [dispatch]);

  return (
    <>
      {article && !newArticleResponse && isLoading && (
        <Loading>Loading...</Loading>
      )}
      {article && newArticleResponse && isLoading && (
        <Loading>Loading...</Loading>
      )}
      {articleError && <Error>{articleError.toString()}</Error>}
      {article &&
        article.map((content) => (
          <Fragment key={id}>
            <Banner>
              <Title>{content.title}</Title>
            </Banner>
            {user && (
              <Box>
                <Edit to={`/edit/${id}`}>編輯</Edit>
                <Delete onClick={() => handleDeleteArticle(id)}>刪除</Delete>
              </Box>
            )}
            <ArticleText>
              <Time>{new Date(content.createdAt).toLocaleDateString()}</Time>
              <MDEditor.Markdown source={content.body} />
            </ArticleText>
          </Fragment>
        ))}
    </>
  );
}
