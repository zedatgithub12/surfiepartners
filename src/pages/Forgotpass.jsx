import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

function Forgotpass() {
  const [forInput, setForInput] = useState({
    email: "",
    emailbc: false,
    emailht: "",
  });

  const updateEmail = (event) => {
    setForInput({
      ...forInput,
      email: event.target.value,
    });
  };

  const Forgot = () => {
    const re = /\S+@\S+\.\S+/;

    if (forInput.email === "") {
      setForInput({
        ...forInput,
        emailbc: true,
        emailht: "Please enter email",
      });
      document.getElementById("logEmail").focus();
    } else if (!re.test(forInput.email)) {
      setForInput({
        ...forInput,
        emailbc: true,
        emailht: "email must contain @ and . symbols",
      });
      document.getElementById("logEmail").focus();
    } else {
      alert("all is well");
    }
  };

  return (
    <>
      <Container fluid className="primary-bg p-3 sticky-top  ">
        <Row>
          <Col sm={2} className="me-3">
            <img src={Logo} alt="logo" width="90" height="50" />
          </Col>{" "}
          <Col sm={2}></Col>
        </Row>
      </Container>
      <Container className="mt-5 py-5" id="authcard">
        <Row className="d-flex justify-content-center align-items-center p-4 ">
          <Col className="bg-light border-0 rounded-2 shadow-sm p-4  ">
            <Row className="d-flex justify-content-between align-items-center ">
              <Col sm={8} className=" text-start">
                <p className="fw-bold fs-3">Forgot Password?</p>
              </Col>
            </Row>

            <input
              type="email"
              id="logEmail"
              className={
                forInput.emailbc
                  ? "form-control mt-5 border-danger"
                  : "form-control mt-5"
              }
              placeholder="Enter your email address"
              aria-label="Email Address"
              value={forInput.email}
              onChange={updateEmail}
            />
            <small class="form-text mt-0 text-danger">{forInput.emailht}</small>

            <button
              type="button"
              id="primarybtn"
              className="btn  mt-4 form-control"
              onClick={() => Forgot()}
            >
              Forgot
            </button>

            <Row className="d-flex justify-content-between align-items-center text-center mt-3">
              <Col>
                <NavLink to="/" id="link">Sign In</NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Forgotpass;
