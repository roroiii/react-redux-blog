import styled from "styled-components";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/userReducer";
import { MEDIA_QUERY_S, MEDIA_QUERY_L } from "../../constants/breakpoint";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #faf7f3;
  box-shadow: 0 0 10px #d2d2d2;
  color: #dab2b5;
  font-weight: 600;
  z-index: 5;

  ${MEDIA_QUERY_L} {
    height: 100px;
    flex-wrap: wrap;
    text-align: center;
  }

  ${MEDIA_QUERY_S} {
    height: auto;
  }
`;

const Brand = styled.div`
  color: #5ebfb8;
  font-size: 24px;
  margin: 0 12px;

  ${MEDIA_QUERY_L} {
    order: -1;
    width: 100%;
    margin: 12px 0 0;
  }

  ${MEDIA_QUERY_S} {
    font-size: 20px;
  }
`;
const NavbarList = styled.div`
  display: flex;
  flex-direction: row;
  height: 64px;

  ${MEDIA_QUERY_L} {
    width: 50%;
  }
  ${MEDIA_QUERY_S} {
    width: 100%;
    height: 44px;
    justify-content: center;
  }
`;
const Nav = styled(Link)`
  position: relative;
  margin: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  cursor: pointer;
  color: #f35f70;
  text-decoration: none;

  & + & {
    margin-left: 8px;
  }

  ${(props) =>
    props.$active &&
    `
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      bottom: 0;
      border-bottom: 5px solid #f35f70;
    }
  `};
  ${MEDIA_QUERY_L} {
    font-size: 14px;
  }
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const handleLogout = () => {
    dispatch(logout(history));
  };

  return (
    <HeaderContainer>
      <NavbarList>
        <Nav to="/" $active={location.pathname === "/"}>
          HOME
        </Nav>
        <Nav to="/articles" $active={location.pathname === "/articles"}>
          ARTICLES
        </Nav>
      </NavbarList>
      <Brand>TASTE OF SUMMER</Brand>
      <NavbarList>
        <Nav to="/about" $active={location.pathname === "/about"}>
          ABOUT
        </Nav>
        {!user && (
          <Nav to="/login" $active={location.pathname === "/login"}>
            LOGIN
          </Nav>
        )}
        {user && (
          <>
            <Nav to="/new-post" $active={location.pathname === "/new-post"}>
              NEW POST
            </Nav>
            <Nav to="/" onClick={handleLogout}>
              LOGOUT
            </Nav>
          </>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
