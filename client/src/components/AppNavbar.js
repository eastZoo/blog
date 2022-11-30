import React, { useCallback, useEffect, useState } from "react";
import {  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form,
  Button,
  SearchInput } from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from '../redux/reducers/auth'

const AppNavbar = () => { 
  // 모바일 환경에서 collpase바 로그인시 자동으로 닫히거나 할때 사용
  const [isOpen , setIsOpen] = useState(false);
  const { isAuthenticated ,user, userRole } = useSelector((state) => state.auth);
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


  return (
    <>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Side Project's Blog(동주의 블로그)
          </Link>
          <NavbarToggler onClick={handleToggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-felx justify-content-around" navbar>
              {isAuthenticated ? <h1 className="text-white">authLink</h1> :  <LoginModal/>}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar