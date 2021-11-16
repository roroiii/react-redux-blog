import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { updateArticle, getArticle } from "../../redux/reducers/articleReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Loading from "../../components/Loading";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/id/1012/1200");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
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

const PostContent = styled.form`
  max-width: 800px;
  margin: 80px auto 120px;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  padding: 20px;
  background-color: #faf7f3;
  p {
    margin: 6px;
  }
`;

const PostText = styled.h3`
  margin-bottom: 16px;
`;

const PostInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 0;
  margin-bottom: 32px;
`;

const PostButton = styled.button`
  margin-top: 32px;
  width: 100%;
  background-color: #f35f70;
  border: 0;
  color: #ffffff;
  padding: 16px 0;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
`;

export default function NewPostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const user = useSelector((store) => store.user.user);
  const article = useSelector((store) => store.article.article);
  const isLoading = useSelector((store) => store.article.isLoadingArticle);
  const errorMessage = useSelector((store) => store.article.articleError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      body: post,
    };
    dispatch(updateArticle(history, id, payload));
  };

  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (article) {
      setTitle(article[0].title);
      setPost(article[0].body);
    }
  }, [setTitle, setPost, article]);

  if (!user) {
    alert("請先登入！");
    history.push("/login");
  }
  return (
    <>
      {isLoading && <Loading>Loading...</Loading>}
      <Banner>
        <Title>Edit Post</Title>
      </Banner>
      <PostContent onSubmit={handleSubmit}>
        <PostText>Title</PostText>
        <PostInput
          name="title"
          value={title}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <PostText>Post</PostText>
        <MDEditor
          name="post"
          value={post}
          type="text"
          placeholder="post"
          onChange={setPost}
        />
        <MDEditor.Markdown
          source={post}
          style={{ whiteSpace: "break-spaces" }}
        />
        <PostButton>Submit</PostButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </PostContent>
    </>
  );
}
