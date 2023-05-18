import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { IoIosPeople, IoMdShare } from "react-icons/io";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { BsArrowBarLeft } from "react-icons/bs";
import Connection from "../constants/Connections";
import Footer from "../components/footer";

function Profiledetail() {
  const navigate = useNavigate();
  const Goback = () => {
    navigate(-1);
  };
  const balance = sessionStorage.getItem("balance");
  const yourbalance = JSON.parse(balance);
  const referral = sessionStorage.getItem("referrels");
  const yourreferral = JSON.parse(referral);
  const monthlyref = sessionStorage.getItem("monthly");
  const monthlycount = JSON.parse(monthlyref);

  const [monthly] = useState(monthlycount);
  const userinfo = sessionStorage.getItem("user");
  const user = JSON.parse(userinfo);

  const [cards] = useState({
    balance: yourbalance,
    noreferrals: yourreferral,
    referralcode: user.referralcode,
  });

  const [profile, setprofile] = useState({
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
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    content: "",
  });
  const [changing, setChanging] = useState(false);
  const [pass, setPass] = useState({
    type: "",
    content: "",
  });
  const UpdateFname = (event) => {
    setprofile({
      ...profile,
      fname: event.target.value,
      fnamebc: false,
      fnameht: "",
    });
  };
  const UpdateMname = (event) => {
    setprofile({
      ...profile,
      mname: event.target.value,
      mnamebc: false,
      mnameht: "",
    });
  };
  const UpdateLname = (event) => {
    setprofile({
      ...profile,
      lname: event.target.value,
      lnamebc: false,
      lnameht: "",
    });
  };

  const UpdateEmail = (event) => {
    setprofile({
      ...profile,
      email: event.target.value,
      emailbc: false,
      emailht: "",
    });
  };
  const UpdatePhone = (event) => {
    setprofile({
      ...profile,
      phone: event.target.value,
      phonebc: false,
      phoneht: "",
    });
  };

  const UpdateOrg = (event) => {
    setprofile({
      ...profile,
      organization: event.target.value,
      organizationbc: false,
      organizationht: "",
    });
  };
  const validateForm = () => {
    let isValid = true;

    if (profile.fname.trim() === "") {
      setprofile({
        ...profile,
        fnameht: "First name cannot be empty",
        fnamebc: true,
      });
      isValid = false;
    }

    if (profile.mname.trim() === "") {
      setprofile({
        ...profile,
        mnameht: "Middle name cannot be empty",
        mnamebc: true,
      });
      isValid = false;
    }

    if (profile.lname.trim() === "") {
      setprofile({
        ...profile,
        lnameht: "Last name cannot be empty",
        lnamebc: true,
      });
      isValid = false;
    }

    if (profile.phone.trim() === "") {
      setprofile({
        ...profile,
        phoneht: "Phone number cannot be empty",
        phonebc: true,
      });
      isValid = false;
    } else if (isNaN(profile.phone)) {
      setprofile({
        ...profile,
        phoneht: "Phone number must be numeric",
        phonebc: true,
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUpdating(true);
      var Api = Connection.api + Connection.updateprofile + user.id;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      var Data = {
        fname: profile.fname,
        mname: profile.mname,
        lname: profile.lname,
        phone: profile.phone,
        organization: profile.organization,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message === "updated successfully") {
            //disable loading
            setUpdating(false);
            sessionStorage.setItem("user", JSON.stringify(response.profile));
            setMessage({
              ...message,
              type: "success",
              content: response.message,
            });
          } else if (response.message === "Partner not found") {
            setUpdating(false);
            setMessage({
              ...message,
              type: "error",
              content: response.message,
            });
          } else {
            setUpdating(false);
            setMessage({
              ...message,
              type: "error",
              content: response.message,
            });
          }
        })
        .catch((e) => {
          setUpdating(false);
        });
    }
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

      setChanging(true);
      var Api = Connection.api + Connection.changepassword + user.id;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      var Data = {
        oldpass: state.oldpassword,
        newpass: state.newpassword,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.message);
          if (response.message === "changed successfully") {
            setChanging(false);
            setPass({
              ...pass,
              type: "success",
              content: response.message,
            });
          } else if (response.message === "Old password does not match") {
            setChanging(false);
            setPass({
              ...pass,
              type: "error",
              content: response.message,
            });
          } else {
            setChanging(false);
            setPass({
              ...pass,
              type: "error",
              content: response.message,
            });
          }
        })
        .catch((e) => {
          setChanging(false);
          setPass({
            ...pass,
            type: "error",
            content: "error changing password",
          });
        });
    }
  };

  const [showpass, setShowPass] = useState(false);

  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5 shadow bg-white py-1 rounded px-3">
          <Col sm={12}>
            <Row className="px-2 mb-1">
              <Col className="pt-3">
                <div className="d-flex justify-content-between align-items-center p-3 border mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <span className="fs-4 fw-semibold text-dark">
                      <span className="fs-4 fw-normal text-muted"> ETB </span>
                      {cards.balance}
                    </span>
                    <br />
                    <small>Current Balance</small>
                  </div>
                  <FaWallet size={28} className="money-color" />
                </div>
              </Col>

              <Col className="pt-3">
                <div className="d-flex justify-content-between align-items-center p-3 border mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <span className="fs-4 fw-semibold text-dark">
                      {cards.noreferrals}
                      {monthly ? (
                        <sup className=" bg-success text-success caption bg-opacity-10 px-1 rounded">
                          +{monthly}
                        </sup>
                      ) : null}
                    </span>
                    <br />
                    <small>Referred Customers</small>
                  </div>
                  <IoIosPeople size={32} className="primary-text" />
                </div>
              </Col>
              <Col className="pt-3">
                <div className="d-flex justify-content-between align-items-center p-3   mt-0 bg-warning rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <span className="fs-4 fw-semibold text-dark">
                      {cards.referralcode}
                    </span>
                    <br />
                    <small>Referral code</small>
                  </div>

                  <IoMdShare size={30} />
                </div>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between mb-3">
              <Col sm={6} className=" ">
                <div className="bg-light rounded m-2 p-4">
                  <p>Your Informations</p>

                  <form onSubmit={handleSubmit}>
                    <div className="input-group mt-4">
                      <input
                        type="text"
                        id="fname"
                        className={
                          profile.fnamebc
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        placeholder="First Name"
                        aria-label="firstname"
                        value={profile.fname}
                        onChange={UpdateFname}
                      />

                      <input
                        type="text"
                        id="mname"
                        className={
                          profile.mnamebc
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        placeholder="Middle Name"
                        aria-label="Middle Name"
                        value={profile.mname}
                        onChange={UpdateMname}
                      />
                    </div>
                    <small className="form-text ps-0 pt-0 text-danger">
                      {profile.fnameht} {profile.mnameht}
                    </small>
                    <input
                      type="text"
                      id="lname"
                      className={
                        profile.lnamebc
                          ? "form-control mt-3 border-danger"
                          : "form-control mt-3"
                      }
                      placeholder="Last Name"
                      aria-label="Last Name"
                      value={profile.lname}
                      onChange={UpdateLname}
                    />
                    <small className="form-text mt-0 text-danger">
                      {profile.lnameht}
                    </small>
                    <input
                      type="email"
                      id="regemail"
                      disabled
                      className={
                        profile.emailbc
                          ? "form-control mt-3 border-danger "
                          : "form-control mt-3 border-0"
                      }
                      placeholder="Email Address"
                      aria-label="Email Address"
                      value={profile.email}
                      onChange={UpdateEmail}
                    />
                    <small className="form-text mt-0 text-danger">
                      {profile.emailht}
                    </small>
                    <input
                      type="phone"
                      id="phone"
                      className={
                        profile.phonebc
                          ? "form-control mt-3 border-danger"
                          : "form-control mt-3 "
                      }
                      placeholder="Phone"
                      aria-label="Phone"
                      value={profile.phone}
                      onChange={UpdatePhone}
                    />
                    <small className="form-text mt-0 text-danger">
                      {profile.phoneht}{" "}
                    </small>
                    {user.organization ? (
                      <input
                        type="text"
                        id="organization"
                        disabled
                        className="form-control mt-3 border-0 "
                        placeholder="Organization"
                        aria-label="Organization"
                        value={profile.organization}
                        onChange={UpdateOrg}
                      />
                    ) : null}
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="submit"
                        id="primarybtn"
                        disabled={updating ? true : false}
                        className="btn  mt-4 end-0 px-4"
                      >
                        {updating ? (
                          <div
                            className="spinner-border spinner-border-sm text-light "
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "Update"
                        )}
                      </button>
                      <div className="mt-4 end-0">
                        {message.type === "success" ? (
                          <div className="m-auto px-4 rounded bg-success bg-opacity-10">
                            <p className="py-1 text-capitalize my-auto text-success fw-normal">
                              {message.content}
                            </p>
                          </div>
                        ) : message.type ? (
                          <div className="m-auto px-4 rounded bg-danger bg-opacity-10">
                            <p className="py-1 text-capitalize my-auto text-danger fw-semibold">
                              {message.content}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </form>
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
                        value={state.oldpassword}
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
                        value={state.newpassword}
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
                        value={state.confirmpassword}
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
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        id="primarybtn"
                        className="btn  mt-1 end-0 px-4"
                        disabled={changing ? true : false}
                        onClick={() => SubmitChange()}
                      >
                        Change
                      </button>
                      <div className="mt-1 end-0 ">
                        {pass.type === "success" ? (
                          <div className="m-auto px-4 rounded bg-success bg-opacity-10">
                            <p className="py-1 text-capitalize my-auto text-success fw-semibold">
                              {pass.content}
                            </p>
                          </div>
                        ) : pass.type ? (
                          <div className="m-auto px-4 rounded bg-danger bg-opacity-10">
                            <p className="py-1 text-capitalize my-auto text-danger fw-semibold">
                              {pass.content}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
            <NavLink
              onClick={Goback}
              className="text-secondary border rounded px-3 py-1 fw-semibold ms-2 mb-3 my-3  float-end"
            >
              <BsArrowBarLeft size={18} /> Back
            </NavLink>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Profiledetail;
