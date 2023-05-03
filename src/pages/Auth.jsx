import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Approved from "../assets/images/Approved.svg";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { AuthContext } from "../context/Context";
import Connection from "../constants/Connections";
import MuiAlert from "@mui/material/Alert";
import { IoMdClose } from "react-icons/io";
import { FormControlLabel, Radio, RadioGroup, Grid } from "@mui/material";
import Footer from "../components/footer";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Auth() {
  const navigate = useNavigate();
  const { SignIn } = useContext(AuthContext);
  const Sign = (status, user) => {
    SignIn(status, user);
  };

  const [open, setOpen] = React.useState(false);
  const close = () => {
    setOpen(false);
  };

  /******************************************** */
  //Register Partner Section
  /******************************************** */
  const [register, setRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [regSpinner, setRegSpinner] = useState(false);
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

    showres: false,
    serverres: "",
  });
  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const handleOrganizationChange = (event) => {
    setShowAdditionalField(event.target.value === "organization");
  };

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

  const CreateAccount = () => {
    const re = /\S+@\S+\.\S+/;
    const phonereg = /^[0-9+]*$/;

    if (regInput.fname === "") {
      setRegInput({
        ...regInput,
        fnamebc: true,
        fnameht: "Please enter first name",
      });
      document.getElementById("fname").focus();
    } else if (regInput.mname === "") {
      setRegInput({
        ...regInput,
        mnamebc: true,
        mnameht: "Please enter middle name",
      });
      document.getElementById("mname").focus();
    } else if (regInput.lname === "") {
      setRegInput({
        ...regInput,
        lnamebc: true,
        lnameht: "Please enter last name",
      });
      document.getElementById("lname").focus();
    } else if (regInput.email === "") {
      setRegInput({
        ...regInput,
        emailbc: true,
        emailht: "Please enter email",
      });
      document.getElementById("regemail").focus();
    } else if (!re.test(regInput.email)) {
      setRegInput({
        ...regInput,
        emailbc: true,
        emailht: "email must contain @ and . symbols",
      });
      document.getElementById("regemail").focus();
    } else if (regInput.phone === "") {
      setRegInput({
        ...regInput,
        phonebc: true,
        phoneht: "Please enter phone number",
      });
      document.getElementById("phone").focus();
    } else if (!phonereg.test(regInput.phone)) {
      setRegInput({
        ...regInput,
        phonebc: true,
        phoneht: "You can only use 0-9 and + sign",
      });
      document.getElementById("phone").focus();
    } else if (regInput.password === "") {
      setRegInput({
        ...regInput,
        passwordbc: true,
        passwordht: "Please enter password",
      });
      document.getElementById("password").focus();
    } else if (showAdditionalField && regInput.organization === "") {
      setRegInput({
        ...regInput,
        organizationbc: true,
        organizationht: "Please enter organization name",
      });
      document.getElementById("organization").focus();
    } else if (regInput.cpassword === "") {
      setRegInput({
        ...regInput,
        cpasswordbc: true,
        cpasswordht: "Please confirm password",
      });
      document.getElementById("cpassword").focus();
    } else if (!(regInput.cpassword === regInput.password)) {
      setRegInput({
        ...regInput,
        cpasswordbc: true,
        cpasswordht: "Password doesn't match!",
      });
      document.getElementById("cpassword").focus();
    } else {
      setRegSpinner(true);
      //the api call to the backend of the system will be made from here!
      var Api = Connection.api + Connection.register;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var data = {
        fname: regInput.fname,
        mname: regInput.mname,
        lname: regInput.lname,
        email: regInput.email,
        phone: regInput.phone,
        organization: regInput.organization,
        password: regInput.password,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response === "200") {
            setRegSpinner(false);
            setOpen(true);
            setRegister(false);
            setRegInput({
              ...regInput,
              showres: false,
              serverres: "",
            });
          } else if (response === "80") {
            setRegSpinner(false);
            setOpen(false);
            setRegInput({
              ...regInput,
              showres: true,
              serverres: "Email address already exist!",
            });
          } else if (response === "81") {
            setRegSpinner(false);
            setOpen(false);
            setRegInput({
              ...regInput,
              showres: true,
              serverres: "Phone number already exist!",
            });
          }
          else if (response === "82") {
            setRegSpinner(false);
            setOpen(false);
            setRegInput({
              ...regInput,
              showres: true,
              serverres: "We are already partners with "+regInput.organization,
            });
          }
        })
        .catch((e) => {
          setRegSpinner(false);
          setOpen(false);
        });
    }
  };

  /****************************************** */
  //Login handling credentials
  /****************************************** */
  const [logSpinner, setLogSpinner] = useState(false);
  const [logInput, setLogInput] = useState({
    email: "",
    emailbc: false,
    emailht: "",

    password: "",
    passwordbc: false,
    passwordht: "",
  });

  const updateLogEmail = (event) => {
    setLogInput({
      ...logInput,
      email: event.target.value,
    });
  };
  const updateLogPassword = (event) => {
    setLogInput({
      ...logInput,
      password: event.target.value,
    });
  };

  const Login = () => {
    const re = /\S+@\S+\.\S+/;
    if (logInput.email === "") {
      setLogInput({
        ...logInput,
        emailbc: true,
        emailht: "Please enter email",
      });
      document.getElementById("logEmail").focus();
    } else if (!re.test(logInput.email)) {
      setLogInput({
        ...logInput,
        emailbc: true,
        emailht: "email must contain @ and . symbols",
      });
      document.getElementById("logEmail").focus();
    } else if (logInput.password === "") {
      setLogInput({
        ...logInput,
        passwordbc: true,
        passwordht: "Please enter your password",
      });
      document.getElementById("logpassword").focus();
    } else {
      setLogSpinner(true);
      //the api call to the backend of the system will be made from here!
      var Api = Connection.api + Connection.login;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var data = {
        email: logInput.email,
        password: logInput.password,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (!(response == "83")) {
            setLogSpinner(false);

            setServerResponse({
              showres: false,
              errorMsg: "",
            });
            Sign("Signed", response);
            navigate("/");
          } else if (response.status == "83") {
            setLogSpinner(false);
            setServerResponse({
              showres: true,
              errorMsg: "Incorrect email or password",
            });
          } else {
            setLogSpinner(false);
            setServerResponse({
              showres: true,
              errorMsg: "Incorrect email or password!",
            });
          }
        })
        .catch((e) => {
          setLogSpinner(false);
        });
    }
  };

  // the axios methos imported from AuthUser Function inside the component folder

  const [loading, setLoading] = useState(false);

  //server reponse states
  const [serverresponse, setServerResponse] = useState({
    showres: false,
    errorMsg: "",
  });

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
            className="bg-white  mt-5 py-2 px-auto  border border-1 border-start-0 border-top-0 border-bottom-0"
          >
            <>
              <div className="float-end mt-4 pt-2">
                <p className="fs-3 mb-0 pe-3">
                  Surfie Ethiopia Partners Portal
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
            <Container className="mt-3 py-5" id="authcard">
              {open ? (
                <>
                  <Alert
                    severity="success"
                    className="w-75 mx-auto d-flex  align-items-center position-relative"
                  >
                    Successfully Registered!
                    <IoMdClose
                      size={18}
                      onClick={() => close()}
                      className="position-absolute end-0 me-3"
                    />
                  </Alert>
                </>
              ) : null}
              {register ? (
                <Row className="d-flex justify-content-center align-items-center p-4 ">
                  <Col className="bg-light border-0 rounded-2 shadow-sm p-4  ">
                    <Row className="d-flex justify-content-between align-items-center">
                      <Col sm={6} className=" text-start">
                        <p className="fw-bold fs-3">Register here</p>
                      </Col>

                      <Col sm={5} className=" me-2">
                        <NavLink
                          onClick={() => setRegister(!register)}
                          className="text-primary"
                        >
                          I have an account?
                        </NavLink>
                      </Col>
                    </Row>
                    {regInput.showres ? (
                      <small class="form-text mt-0 text-danger bg-danger bg-opacity-10 p-2 rounded form-control border-0 text-center mt-2">
                        {regInput.serverres}
                      </small>
                    ) : null}
                    <div className="input-group mt-3">
                      <input
                        type="text"
                        id="fname"
                        className={
                          regInput.fnamebc
                            ? "form-control border-danger"
                            : "form-control "
                        }
                        placeholder="First Name"
                        aria-label="firstname"
                        value={regInput.fname}
                        onChange={UpdateFname}
                      />

                      <input
                        type="text"
                        id="mname"
                        className={
                          regInput.mnamebc
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        placeholder="Middle Name"
                        aria-label="Middle Name"
                        value={regInput.mname}
                        onChange={UpdateMname}
                      />
                    </div>
                    <small class="form-text ps-0 pt-0 text-danger">
                      {regInput.fnameht} {regInput.mnameht}
                    </small>
                    <input
                      type="text"
                      id="lname"
                      className={
                        regInput.lnamebc
                          ? "form-control mt-3 border-danger"
                          : "form-control mt-3"
                      }
                      placeholder="Last Name"
                      aria-label="Last Name"
                      value={regInput.lname}
                      onChange={UpdateLname}
                    />
                    <small class="form-text mt-0 text-danger">
                      {regInput.lnameht}
                    </small>
                    <input
                      type="email"
                      id="regemail"
                      className={
                        regInput.emailbc
                          ? "form-control mt-3 border-danger"
                          : "form-control mt-3 "
                      }
                      placeholder="Email Address"
                      aria-label="Email Address"
                      value={regInput.email}
                      onChange={UpdateEmail}
                    />
                    <small class="form-text mt-0 text-danger">
                      {regInput.emailht}{" "}
                    </small>
                    <input
                      type="phone"
                      id="phone"
                      className={
                        regInput.phonebc
                          ? "form-control mt-3 border-danger"
                          : "form-control mt-3 "
                      }
                      placeholder="Phone"
                      aria-label="Phone"
                      value={regInput.phone}
                      onChange={UpdatePhone}
                    />
                    <small class="form-text mt-0 text-danger">
                      {regInput.phoneht}
                    </small>

                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12}>
                        <RadioGroup
                          name="field"
                          className="mt-2 ps-1"
                          onChange={handleOrganizationChange}
                          row
                        >
                          <FormControlLabel
                            value="sales"
                            control={<Radio />}
                            label="Sales"
                          />
                          <FormControlLabel
                            value="organization"
                            control={<Radio />}
                            label="Organization"
                          />
                        </RadioGroup>
                      </Grid>
                      {showAdditionalField && (
                        <Grid item xs={12}>
                          <input
                            type="text"
                            id="organization"
                            className={
                              regInput.organizationbc
                                ? "form-control mt-0 border-danger"
                                : "form-control mt-0 "
                            }
                            placeholder="Organization Name"
                            aria-label="Organization"
                            value={regInput.organization}
                            onChange={UpdateOrg}
                          />
                          <small class="form-text mt-0 text-danger">
                            {regInput.organizationht}
                          </small>
                        </Grid>
                      )}
                    </Grid>
                    <div className="input-group mt-3">
                      <input
                        type={show ? "text" : "password"}
                        id="password"
                        className={
                          regInput.passwordbc
                            ? "form-control border-danger"
                            : "form-control "
                        }
                        placeholder="Password"
                        aria-label="Password"
                        value={regInput.password}
                        onChange={UpdatePass}
                      />

                      <input
                        type={show ? "text" : "password"}
                        id="cpassword"
                        className={
                          regInput.cpasswordbc
                            ? "form-control border-danger"
                            : "form-control "
                        }
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
                    <small class="form-text mt-0 text-danger">
                      {regInput.passwordht}
                    </small>
                    <small class="form-text mt-0 text-danger">
                      {regInput.cpasswordht}
                    </small>
                    <button
                      type="button"
                      disabled={regSpinner ? true : false}
                      id="primarybtn"
                      className=" primary-btn-bg border-0 mt-4 form-control"
                      onClick={() => CreateAccount()}
                    >
                      {regSpinner ? (
                        <div
                          className="spinner-border spinner-border-sm text-light "
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Create Account"
                      )}
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
                        <NavLink
                          onClick={() => setRegister(!register)}
                          className="text-primary"
                        >
                          Don't have an account?
                        </NavLink>
                      </Col>
                      {serverresponse.showres ? (
                        <small class="form-text mt-0 text-danger bg-danger bg-opacity-10 p-2 rounded form-control border-0 text-center mt-2">
                          {serverresponse.errorMsg}
                        </small>
                      ) : null}
                    </Row>

                    <input
                      type="email"
                      id="logEmail"
                      className={
                        logInput.emailbc
                          ? "form-control mt-5 border-danger"
                          : "form-control mt-5"
                      }
                      placeholder="Email Address"
                      aria-label="Email Address"
                      value={logInput.email}
                      onChange={updateLogEmail}
                    />
                    <small class="form-text mt-0 text-danger">
                      {logInput.emailht}
                    </small>
                    <div className="input-group mt-3">
                      <input
                        type={show ? "text" : "password"}
                        id="logpassword"
                        className={
                          logInput.passwordbc
                            ? "form-control  border-danger"
                            : "form-control "
                        }
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
                    <small class="form-text mt-0 text-danger">
                      {logInput.passwordht}
                    </small>

                    <button
                      type="button"
                      disabled={logSpinner ? true : false}
                      id="primarybtn"
                      className=" primary-btn-bg border-0 mt-4 form-control"
                      onClick={() => Login()}
                    >
                      {logSpinner ? (
                        <div
                          className="spinner-border spinner-border-sm text-light "
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </button>

                    <Row className="d-flex justify-content-between align-items-center text-center mt-3">
                      {/* <Col className="text-start d-flex align-items-center ">
                  <Checkbox label="Remember me" /> <span>Remember me</span>
                </Col> */}

                      <Col>
                        <NavLink to="./forgotpass" id="link">
                          Forgot Password
                        </NavLink>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </Container>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Auth;
