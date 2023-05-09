import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import Approved from "../assets/images/Approved.svg";
import Connection from "../constants/Connections";
import { BsCheck2Circle } from "react-icons/bs";
import { IoMdWarning } from "react-icons/io";
function Forgotpass() {
  const [forInput, setForInput] = useState({
    email: "",
    emailbc: false,
    emailht: "",
  });
  const [forgetting, setForgetting] = useState(false);
  const updateEmail = (event) => {
    setForInput({
      ...forInput,
      email: event.target.value,
    });
  };
  const [response, setResponse] = useState({
    status: "",
    content: "",
  });
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
      setForgetting(true);
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
          if (response.message === "Password reset link sent to your email") {
            setForgetting(false);
            setResponse({
              ...response,
              status: "success",
              content: response.message,
            });
          } else {
            setForgetting(false);
            setResponse({
              ...response,
              status: "error",
              content: response.message,
            });
          }
        })
        .catch((e) => {
          setResponse({
            ...response,
            status: "error",
            content: "There is problem Forgeting password. Retry later!",
          });
          setForgetting(false);
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
                <p className="fs-3 mb-0 mt-2 pe-3 text-end">
                  Surfie Ethiopia Partners <br /> Collaboration Portal
                </p>
                <small className="fs-6 pt-1 float-end mt-0 pe-3 text-muted">
                  Referre & Earn
                </small>
              </div>
              <img
                src={Approved}
                alt="Surfie Ethiopia Partners"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "85%",
                  float: "right",
                  paddingRight: 3,
                  marginTop: 20,
                }}
              />
            </>
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
                    {forgetting ? (
                      <div
                        className="spinner-border spinner-border-sm text-light "
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Forgot Password"
                    )}
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
              {response.status === "success" ? (
                <Row>
                  <Col className="d-flex justify-content-around align-items-center px-4 py-2 mx-4 rounded bg-success bg-opacity-10 text-success">
                    <BsCheck2Circle size={28} className=" text-success" />
                    <Typography>{response.content}</Typography>
                  </Col>
                </Row>
              ) : response.status === "error" ? (
                <Row>
                  <Col className="d-flex justify-content-around align-items-center px-4 py-2 mx-4 rounded bg-danger bg-opacity-10 text-danger">
                    <IoMdWarning size={28} className=" text-danger" />
                    <Typography>{response.content}</Typography>
                  </Col>
                </Row>
              ) : null}
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Forgotpass;
