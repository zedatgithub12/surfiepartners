import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Grid, Typography } from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import Connection from "../constants/Connections";
import { BsEyeSlash, BsEye, BsCheck2Circle } from "react-icons/bs";
import { IoMdWarning } from "react-icons/io";
function ResetPassword() {
  const { token } = useParams();
  const [Input, setInput] = useState({
    password: "",
    passwordbc: false,
    passwordht: "",
    cpassword: "",
    cpasswordbc: false,
    cpasswordht: "",
    showres: false,
    serverres: "",
  });
  const [resetting, setResetting] = useState(false);
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState({
    status: "",
    content: "",
  });
  const UpdatePass = (event) => {
    setInput({
      ...Input,
      password: event.target.value,
      passwordbc: false,
      passwordht: "",
    });
  };
  const UpdateCPass = (event) => {
    setInput({
      ...Input,

      cpassword: event.target.value,
      cpasswordbc: false,
      cpasswordht: "",
    });
  };
  const Forgot = () => {
    const re = /\S+@\S+\.\S+/;

    if (Input.password === "") {
      setInput({
        ...Input,
        passwordbc: true,
        passwordht: "Please enter password",
      });
      document.getElementById("password").focus();
    } else if (Input.cpassword === "") {
      setInput({
        ...Input,
        cpasswordbc: true,
        cpasswordht: "Please confirm password",
      });
      document.getElementById("cpassword").focus();
    } else if (!(Input.cpassword === Input.password)) {
      setInput({
        ...Input,
        cpasswordbc: true,
        cpasswordht: "Password doesn't match!",
      });
      document.getElementById("cpassword").focus();
    } else {
      setResetting(true);
      var Api = Connection.api + Connection.reset;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var data = {
        password: Input.password,
        token: token,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "Password reset successful") {
            setResetting(false);
            setResponse({
              ...response,
              status: "success",
              content: response.message,
            });
          } else {
            setResetting(false);
            setResponse({
              ...response,
              status: "error",
              content: response.message,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          setResetting(false);
          setResponse({
            ...response,
            status: "error",
            content: "There is problem resetting password. Retry later!",
          });
        });
    }
  };

  return (
    <>
      <Container fluid className="primary-bg p-3 sticky-top  ">
        <Row>
          <Col sm={2} className="me-3">
            <img src={Logo} alt="logo" width="90" height="50" />
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={1} className="m-auto my-4">
          <Grid item xs={12} md={12}>
            <Container className="mt-5 py-2" id="authcard">
              <Row className="d-flex justify-content-center align-items-center p-4 ">
                <Col className="bg-light border-0 rounded-2 shadow-sm p-4  ">
                  <Row className="d-flex justify-content-between align-items-center ">
                    <Col sm={8} className=" text-start">
                      <p className="fw-bold fs-3 text-muted">Reset Password</p>
                    </Col>
                  </Row>

                  <div className="input-group mt-3">
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      className={
                        Input.passwordbc
                          ? "form-control border-danger"
                          : "form-control "
                      }
                      placeholder="Password"
                      aria-label="Password"
                      value={Input.password}
                      onChange={UpdatePass}
                    />
                  </div>
                  <small class="form-text mt-0 text-danger">
                    {Input.passwordht}
                  </small>
                  <div className="input-group mt-3">
                    <input
                      type={show ? "text" : "password"}
                      id="cpassword"
                      className={
                        Input.cpasswordbc
                          ? "form-control border-danger"
                          : "form-control "
                      }
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
                      value={Input.cpassword}
                      onChange={UpdateCPass}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
                    </button>
                  </div>

                  <small class="form-text mt-0 text-danger">
                    {Input.cpasswordht}
                  </small>

                  <button
                    type="button"
                    id="primarybtn"
                    className="btn  mt-4 form-control"
                    onClick={() => Forgot()}
                  >
                    {resetting ? (
                      <div
                        className="spinner-border spinner-border-sm text-light "
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Reset Password"
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

export default ResetPassword;
