import React, { useCallback, useEffect, useState } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from '../redux/reducers/auth'
import styled from "styled-components"
import RegisterModal from "./auth/RegisterModal";

const ContainerWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CollapseWrapper = styled(Collapse)`
  flex-direction: row-reverse;
`;

const AuthLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AppNavbar = () => {
  // 모바일 환경에서 collpase바 로그인시 자동으로 닫히거나 할때 사용
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
  console.log(userRole, "UserRole");

  const dispatch = useDispatch();

  //useCallback 메모이제이션 콜백
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
  };

  const authLink = (
    <>
      <NavItem>
        {userRole === "MainJuin" ? (
          <Form className="col mt-2">
            <Link
              to="/post"
              className="btn btn-success block text-white px-3"
              onClick={addPostClick}
            >
              Add Post
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>No User</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#" className="">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </>
  );

  const guestLink = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );


  return (
    <>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <ContainerWrapper>
          <Link to="/" className="text-white text-decoration-none">
            Side Project's Blog(동주의 블로그)
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <CollapseWrapper isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </CollapseWrapper>
        </ContainerWrapper>
      </Navbar>
    </>
  );
}

export default AppNavbar