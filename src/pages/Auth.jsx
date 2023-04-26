import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Header from "../components/header";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Auth() {
  const [register, setRegister] = useState(false);
  const [show, setShow] = useState(false);

  const [regInput, setRegInput] = useState({
    fname: "",
    fnamebc: false,
    fnameht: "",

    mname: "",
    mnamebc: false,
    mnameht: "",

    lname: "",
    lnamebc: false,
    lnameht: "",

    email: "",
    emailbc: false,
    emailht: "",

    phone: "",
    phonebc: false,
    phoneht: "",

    organization: "",
    organizationbc: false,
    organizationht: "",

    password: "",
    passwordbc: false,
    passwordht: "",

    cpassword: "",
    cpasswordbc: false,
    cpasswordht: "",
  });

  const UpdateFname = (event) => {
    setRegInput({
      ...regInput,
      fname: event.target.value,
      fnamebc: false,
      fnameht: "",
    });
  };
  const UpdateMname = (event) => {
    setRegInput({
      ...regInput,
      mname: event.target.value,
      mnamebc: false,
      mnameht: "",
    });
  };
  const UpdateLname = (event) => {
    setRegInput({
      ...regInput,
      lname: event.target.value,
      lnamebc: false,
      lnameht: "",
    });
  };

  const UpdateEmail = (event) => {
    setRegInput({
      ...regInput,
      email: event.target.value,
      emailbc: false,
      emailht: "",
    });
  };
  const UpdatePhone = (event) => {
    setRegInput({
      ...regInput,
      phone: event.target.value,
      phonebc: false,
      phoneht: "",
    });
  };

  const UpdateOrg = (event) => {
    setRegInput({
      ...regInput,
      organization: event.target.value,
      organizationbc: false,
      organizationht: "",
    });
  };

  const UpdatePass = (event) => {
    setRegInput({
      ...regInput,

      password: event.target.value,
      passwordbc: false,
      passwordht: "",
    });
  };
  const UpdateCPass = (event) => {
    setRegInput({
      ...regInput,

      cpassword: event.target.value,
      cpasswordbc: false,
      cpasswordht: "",
    });
  };


  const CreateAccount=()=>{
    const re = /\S+@\S+\.\S+/;


  if(regInput.fname === ""){
    setRegInput({
      ...regInput,
      fnamebc: true,
      fnameht: "Please enter first name",
    });
    document.getElementById('fname').focus();
  }
  else if(regInput.mname === ""){
    setRegInput({
      ...regInput,
      mnamebc: true,
      mnameht: "Please enter middle name",
    });
    document.getElementById('mname').focus();
  }
  else if(regInput.lname === ""){
    setRegInput({
      ...regInput,
      lnamebc: true,
      lnameht: "Please enter last name",
    });
    document.getElementById('lname').focus();
  }
  else if(regInput.email === ""){
    setRegInput({
      ...regInput,
      emailbc: true,
      emailht: "Please enter email",
    });
    document.getElementById('regemail').focus();
  }

  else if(!(re.test(regInput.email))){
    setRegInput({
      ...regInput,
      emailbc: true,
      emailht: "email must contain @ and . symbols",
    });
    document.getElementById('regemail').focus();
  }

  else if(regInput.phone === ""){
    setRegInput({
      ...regInput,
      phonebc: true,
      phoneht: "Please enter phone number",
    });
    document.getElementById('phone').focus();
  }

  else if(regInput.password === ""){
    setRegInput({
      ...regInput,
      passwordbc: true,
      passwordht: "Please enter password",
    });
    document.getElementById('password').focus();
  }
  else if(regInput.cpassword === ""){
    setRegInput({
      ...regInput,
      cpasswordbc: true,
      cpasswordht: "Please confirm password",
    });
    document.getElementById('cpassword').focus();
  }
  else if(!(regInput.cpassword === regInput.password)){
    setRegInput({
      ...regInput,
      cpasswordbc: true,
      cpasswordht: "Password doesn't match!",
    });
    document.getElementById('cpassword').focus();
  }

else {
  //the api call to the backend of the system will be made from here!
  alert("all is well");
}

  };


  const [logInput, setLogInput] = useState({
    email: "",
    emailbc: false,
    emailht: "",

    password: "",
    passwordbc: false,
    passwordht: "",
  });

  const updateLogEmail=(event)=>{
    setLogInput({
      ...logInput,
      email: event.target.value,
     
    });
  }
  const updateLogPassword=(event)=>{
    setLogInput({
      ...logInput,
      password: event.target.value,
     
    });
  }

const Login=()=>{
  const re = /\S+@\S+\.\S+/;


   if(logInput.email === ""){
    setLogInput({
      ...logInput,
      emailbc: true,
      emailht: "Please enter email",
    });
    document.getElementById('logEmail').focus();
  }

  else if(!(re.test(logInput.email))){
    setLogInput({
      ...logInput,
      emailbc: true,
      emailht: "email must contain @ and . symbols",
    });
    document.getElementById('logEmail').focus();
  }

  else if(logInput.password === ""){
    setLogInput({
      ...logInput,
      passwordbc: true,
      passwordht: "Please enter your password",
    });
    document.getElementById('logPassword').focus();
  }
  else {

    alert("all is well");
  }
}



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
        {register ? (
          <Row className="d-flex justify-content-center align-items-center p-4 ">
            <Col className="bg-light border-0 rounded-2 shadow-sm p-4  ">
              <Row className="d-flex justify-content-between align-items-center">
                <Col sm={6} className=" text-start">
                  <p className="fw-bold fs-3">Register</p>
                </Col>

                <Col sm={5} className=" me-2">
                  <NavLink onClick={() => setRegister(!register)}>
                    I have an account?
                  </NavLink>
                </Col>
              </Row>

              <div className="input-group mt-4">
                <input
                  type="text"
                  id="fname"
                  className={regInput.fnamebc ? "form-control border-danger" : "form-control "}
                  placeholder="First Name"
                  aria-label="firstname"
                  value={regInput.fname}
                  onChange={UpdateFname}
                />

                <input
                  type="text"
                  id="mname"
                  className={regInput.mnamebc ? "form-control border-danger" : "form-control"}
                  placeholder="Middle Name"
                  aria-label="Middle Name"
                  value={regInput.mname}
                  onChange={UpdateMname}
                />
                
              </div>
              <small  class="form-text ps-0 pt-0 text-danger">{regInput.fnameht} {regInput.mnameht}</small>
              <input
                type="text"
                id="lname"
                className={regInput.lnamebc ? "form-control mt-3 border-danger" : "form-control mt-3"}
                placeholder="Last Name"
                aria-label="Last Name"
                value={regInput.lname}
                onChange={UpdateLname}
              />
              <small  class="form-text mt-0 text-danger">{regInput.lnameht}</small>
              <input
                type="email"
                id="regemail"
                className={regInput.emailbc ? "form-control mt-3 border-danger" : "form-control mt-3 "}
                placeholder="Email Address"
                aria-label="Email Address"
                value={regInput.email}
                onChange={UpdateEmail}
              />
                  <small  class="form-text mt-0 text-danger">{regInput.emailht} </small>
              <input
                type="phone"
                id="phone"
                className={regInput.phonebc ? "form-control mt-3 border-danger" : "form-control mt-3 "}
                placeholder="Phone"
                aria-label="Phone"
                value={regInput.phone}
                onChange={UpdatePhone}
              />
              <small  class="form-text mt-0 text-danger">{regInput.phoneht} </small>
              <input
                type="text"
                id="organization"
                className="form-control mt-3 "
                placeholder="Organization (optional)"
                aria-label="Organization"
                value={regInput.organization}
                onChange={UpdateOrg}
              />
             <small  class="form-text mt-0 text-danger">{regInput.organizationht} </small>
              <div className="input-group mt-3">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  className={regInput.passwordbc ? "form-control border-danger" : "form-control "}
                  placeholder="Password"
                  aria-label="Password"
                  value={regInput.password}
                  onChange={UpdatePass}
                />
            
                <input
                  type={show ? "text" : "password"}
                  id="cpassword"
                  className={regInput.cpasswordbc ? "form-control border-danger" : "form-control "}
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  value={regInput.cpassword}
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
              <small  class="form-text mt-0 text-danger">{regInput.passwordht} </small><small  class="form-text mt-0 text-danger">{regInput.cpasswordht} </small>
              <button
                type="button"
                className="btn btn-primary mt-4 form-control"
                onClick={() => CreateAccount()}
              >
                Create Account
              </button>
            </Col>
          </Row>
        ) : (
          <Row className="d-flex justify-content-center align-items-center p-4 ">
            <Col className="bg-light border-0 rounded-2 shadow-sm p-4  ">
              <Row className="d-flex justify-content-between align-items-center ">
                <Col sm={4} className=" text-start">
                  <p className="fw-bold fs-3">Login</p>
                </Col>

                <Col sm={7} className=" text-end me-2">
                  <NavLink onClick={() => setRegister(!register)}>
                    Don't have an account?
                  </NavLink>
                </Col>
              </Row>

              <input
                type="email"
                id = "logEmail"
                className={logInput.emailbc ? "form-control mt-5 border-danger" : "form-control mt-5"}
                placeholder="Email Address"
                aria-label="Email Address"
                value={logInput.email}
                onChange={updateLogEmail}
              />
                <small  class="form-text mt-0 text-danger">{logInput.emailht}</small>
              <div className="input-group mt-3">
                <input
                  type={show ? "text" : "password"}
                  id="logpassword"
                  className={logInput.passwordbc ? "form-control  border-danger" : "form-control "}
                  placeholder="Password"
                  aria-label="Password"
                  value={logInput.password}
                  onChange={updateLogPassword}
                />
                
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShow(!show)}
                >
                  {show ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
                </button>
              </div>
              <small  class="form-text mt-0 text-danger">{logInput.passwordht}</small>

              <button
                type="button"
                className="btn btn-primary mt-4 form-control"
                onClick={() => Login()}
              >
                Login
              </button>

              <Row className="d-flex justify-content-between align-items-center text-center mt-3">
                <Col className="text-start d-flex align-items-center ">
                  <Checkbox label="Remember me" /> <span>Remember me</span>
                </Col>

                <Col>
                  <NavLink to="./forgotpass">Forgot Password</NavLink>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>

      <Container fluid className="text-center position-fixed bottom-0">
        <p className="text-muted small">
          2023 © All right reserved by Afromina Digitals
        </p>
      </Container>
    </>
  );
}

export default Auth;
