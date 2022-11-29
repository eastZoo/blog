import React from "react";
import { Navbar, Container } from "reactstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return(
    <>
      <Navbar>
        <Container>
          <Link to="/" className="">
            Side Project's Blod(동주의 블로그)
          </Link>
        </Container>
      </Navbar>
    </>
  )
}

export default AppNavbar