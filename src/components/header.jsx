import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/logo.png";

function Header() {
    
        return (
            <Container fluid className="primary-bg p-3 sticky-top  ">
        <Row>
          <Col sm={2} className="me-3">
            <img src={Logo} alt="logo" width="90" height="50" />
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
        );
    
}

export default Header;