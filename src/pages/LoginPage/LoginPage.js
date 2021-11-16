import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { login, setLoginError } from "../../redux/reducers/userReducer";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { MEDIA_QUERY_M } from "../../constants/breakpoint";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/id/1015/1200");
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

const Content = styled.form`
  width: 600px;
  margin: 80px auto 0;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  background-color: #faf7f3;

  ${MEDIA_QUERY_M} {
    width: 100%;
  }
`;

const LoginContent = styled.form`
  width: 600px;
  margin: 0 auto 120px;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  background-color: #faf7f3;
  padding: 40px 20px 20px;
  p {
    margin: 6px;
  }

  ${MEDIA_QUERY_M} {
    width: 100%;
  }
`;

const LoginText = styled.h3`
  margin-bottom: 16px;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 0;
  margin-bottom: 32px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #f35f70;
  border: 0;
  color: #ffffff;
  padding: 16px 0;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
`;

const LoginRegisterTab = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LoginTab = styled(Link)`
  display: block;
  text-decoration: none;
  color: #5d5d5d;
  width: 50%;
  padding: 20px;
  text-align: center;
`;
const RegisterTab = styled(LoginTab)`
  background-color: #e8e8e6;
`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const isLoading = useSelector((store) => store.user.isLoading);
  const errorMessage = useSelector((store) => store.user.loginError);
  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(history, formData));
  };

  useEffect(() => {
    return () => {
      dispatch(setLoginError(null));
    };
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loading>Loading...</Loading>}
      <Banner>
        <Title>LOGIN</Title>
      </Banner>
      <Content>
        <LoginRegisterTab>
          <LoginTab to="/login">LOGIN</LoginTab>
          <RegisterTab to="/register">REGISTER</RegisterTab>
        </LoginRegisterTab>
      </Content>
      <LoginContent onSubmit={handleSubmit}>
        <LoginText>Username</LoginText>
        <LoginInput
          name="username"
          value={username}
          placeholder="username"
          onChange={(e) => updateFormData(e)}
        />
        <LoginText>Password</LoginText>
        <LoginInput
          name="password"
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => updateFormData(e)}
        />
        <LoginButton>LOGIN</LoginButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </LoginContent>
    </>
  );
}
