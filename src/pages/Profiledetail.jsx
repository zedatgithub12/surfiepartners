import React, { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/header";
import IconButton from "@mui/material/IconButton";
import { IoIosPeople, IoIosCopy, IoMdShare } from "react-icons/io";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { BsArrowBarLeft, BsArrowLeftCircle } from "react-icons/bs";
import { AuthContext } from "../context/Context";


function Profiledetail() {
  const navigate = useNavigate();
  const Goback = () => {
    navigate(-1);
  };
  const {user} = useContext(AuthContext);
  const [cards, setCards]=useState({
    balance: user.balance,
    noreferrals: user.noreferral,
    referralcode:user.referralcode,
  });

  const [show, setShow] = useState(false);
  const [regInput, setRegInput] = useState({
    fname: user.fname,
    fnamebc: false,
    fnameht: "",

    mname: user.mname,
    mnamebc: false,
    mnameht: "",

    lname: user.lname,
    lnamebc: false,
    lnameht: "",

    email: user.email,
    emailbc: false,
    emailht: "",

    phone: user.phone,
    phonebc: false,
    phoneht: "",

    organization: user.organization,
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

  const [state, setState] = useState({
    loading: false,

    oldpassword: "",
    oldPassState: false,
    oldPassb: false,
    oldPasserrmsg: "",

    newpassword: "",
    newPassb: false,
    newPassState: false,
    newPasserrmsg: "",

    confirmpassword: "",
    confirmPassb: false,
    confirmPassState: false,
    confirmPasserrmsg: "",

    error: false,
    errorMessage: "",
  });

  //update  old password field
  const UpdateOldPassword = (event) => {
    setState({
      ...state,
      oldpassword: event.target.value,
    });
  };

  //update  password field
  const UpdatePassword = (event) => {
    setState({
      ...state,
      newpassword: event.target.value,
    });
  };

  //update Confirm password field
  const UpdateConfirmPass = (event) => {
    setState({
      ...state,
      confirmpassword: event.target.value,
    });
    if (state.confirmpassword === state.newpassword) {
      setState({
        ...state,
        confirmPassState: false,
        confirmPassb: false,
        confirmPasserrmsg: "",
      });
    }
  };

  const SubmitChange = () => {
    if (state.oldpassword === "") {
      setState({
        ...state,
        oldPassState: true,
        oldPassb: true,
        oldPasserrmsg: "Please enter your previous password!",
      });
      return false;
    } else if (state.newpassword === "") {
      setState({
        ...state,
        newPassState: true,
        newPassb: true,
        newPasserrmsg: "Enter new password!",
      });
      return false;
    } else if (state.confirmpassword === "") {
      setState({
        ...state,
        confirmPassState: true,
        confirmPassb: true,
        confirmPasserrmsg: "Confirm new password!",
      });
      return false;
    } else if (state.newpassword !== state.confirmpassword) {
      setState({
        ...state,
        confirmPassState: true,
        confirmPassb: true,
        confirmPasserrmsg: "Password Doesn't match!",
      });
      return false;
    } else if (
      state.oldpassword !== "" &&
      state.newpassword === state.confirmpassword
    ) {
      setState({
        ...state,
        confirmPassState: false,
        confirmPassb: false,
        confirmPasserrmsg: "",
      });

      // the api call code is going to be written here

      alert("all is well");
    }
  };

  const [showpass, setShowPass] = useState(false);

  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5 shadow bg-white py-3 rounded px-3">
    
          <Col sm={12}>
            <Row className="px-2 mb-1">
              <Col>
                <div className="d-flex justify-content-between align-items-center p-3 border mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <small>Current Balance</small> <br />
                    <span className="fs-4 fw-semibold text-dark money-color">{cards.balance} <sup>ETB</sup></span>
                  </div>
                  <FaWallet size={28} className="money-color" />
                </div>
              </Col>

              <Col>
                <div className="d-flex justify-content-between align-items-center p-3 border mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <small>Referred Customers</small> <br />
                    <span className="fs-4 fw-semibold text-dark">{cards.noreferrals}</span>
                  </div>
                  <IoIosPeople size={32} className="text-primary" />
                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center p-3   mt-0 bg-warning rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <small>Referral code</small> <br />
                    <span className="fs-4 fw-semibold text-dark">{cards.referralcode}</span>
                  </div>
                  
                    <IoMdShare size={30} />
               
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between mb-3">
              <Col sm={6} className=" ">
                <div className="bg-light rounded m-2 p-4">
                  <p>Your Informations</p>
                  <div className="input-group mt-4">
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
                    {regInput.phoneht}{" "}
                  </small>
                  <input
                    type="text"
                    id="organization"
                    className="form-control mt-3 "
                    placeholder="Organization (optional)"
                    aria-label="Organization"
                    value={regInput.organization}
                    onChange={UpdateOrg}
                  />
                  <button
                    type="button"
                    className="btn btn-primary mt-4 end-0 px-4"
                    onClick={() => Update()}
                  >
                    Update
                  </button>
                </div>
              </Col>

              <Col sm={6} className="">
                <div className="bg-light rounded m-2 p-4">
                  <p>Change Password</p>
                  {state.error ? (
                    <div
                      id="emailHelp"
                      className="text-danger form-text ms-4 mt-3 small"
                    >
                      {state.errorMessage}
                    </div>
                  ) : null}

                  <form className="m-4 needs-validation" noValidate>
                    <div class="mb-3">
                      <input
                        type="password"
                        className={
                          state.oldPassb
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        defaultValue={state.oldpassword}
                        onChange={UpdateOldPassword}
                        placeholder="Old Password"
                        required
                      />
                      {state.oldPassState ? (
                        <div id="emailHelp" className="text-danger form-text">
                          {state.oldPasserrmsg}
                        </div>
                      ) : null}
                    </div>

                    <div class="mb-3">
                      <input
                        className={
                          state.newPassb
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        id="exampleInputPassword2"
                        type={showpass ? "text" : "password"}
                        required
                        defaultValue={state.newpassword}
                        onChange={UpdatePassword}
                        placeholder="New Password"
                      />

                      {state.newPassState ? (
                        <div id="emailHelp" className="text-danger form-text">
                          {state.newPasserrmsg}
                        </div>
                      ) : null}
                    </div>
                    <div class="mb-3 input-group">
                      <input
                        className={
                          state.confirmPassb
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        id="exampleInputPassword3"
                        type={showpass ? "text" : "password"}
                        required
                        defaultValue={state.confirmpassword}
                        onChange={UpdateConfirmPass}
                        placeholder="Confirm Password"
                      />

                      <Button
                        title="show password"
                        onClick={() => setShowPass(!showpass)}
                        variant="white"
                        className="text-center  bg-secondary text-white rounded-0 rounded-end border-3  me-2 "
                      >
                        {showpass ? (
                          <AiOutlineEye size={20} className="me-1 pb-1" />
                        ) : (
                          <AiOutlineEyeInvisible
                            size={20}
                            className="me-1 pb-1"
                          />
                        )}
                      </Button>
                    </div>
                    {state.confirmPassState ? (
                      <div id="emailHelp" className="text-danger form-text">
                        {state.confirmPasserrmsg}
                      </div>
                    ) : null}
                    <div className="mb-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-primary mt-1 end-0 px-4"
                        onClick={() => SubmitChange()}
                      >
                        Change
                      </button>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
            <NavLink
            onClick={Goback}
            className="text-secondary border rounded px-3 py-1 fw-semibold ms-2 mb-3 my-3  float-end"
          >
           <BsArrowBarLeft size={18}/> Back
          </NavLink>
          </Col>
        
        </Row>
      </Container>
    </>
  );
}

export default Profiledetail;
