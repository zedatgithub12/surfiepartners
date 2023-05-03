import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import Approved from "../assets/images/Approved.svg";
import Connection from "../constants/Connections";

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
      var Api = Connection.api + Connection.forgot;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var data = {
        email: forInput.email,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.message);
        })
        .catch((e) => {
          console.log(e);
        });
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
      <Container maxWidth="lg">
        <Grid container spacing={1} className="m-auto my-4">
          <Grid
            item
            xs={12}
            md={5}
            className="bg-white  mt-5 py-2 px-auto   border border-1 border-start-0 border-top-0 border-bottom-0"
          >
            <>
              <div className="float-end mt-4">
                <p className="fs-3 mb-0 pe-3">
                  Surfie Ethiopia Partners Portal
                </p>
                <small className="fs-6 pt-1 float-end mt-0 pe-3 text-muted">
                  Referre and Earn
                </small>
              </div>
              <img
                src={Approved}
                alt="Surfie Ethiopia Partners"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "80%",
                  float: "right",
                  paddingRight: 3,
                  marginTop: 20,
                }}
              />
            </>{" "}
          </Grid>
          <Grid item xs={12} md={6}>
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
                  <small class="form-text mt-0 text-danger">
                    {forInput.emailht}
                  </small>

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
                      <NavLink to="/" id="link">
                        Sign In
                      </NavLink>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Forgotpass;
