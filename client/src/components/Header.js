import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand href="/">React Weather App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
