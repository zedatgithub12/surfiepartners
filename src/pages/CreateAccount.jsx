import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../assets/logo.png";
import { Button, FormCheck } from "react-bootstrap";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import Dropdown from "react-bootstrap/Dropdown";
import Gateways from "../data/PaymentGateways";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsCheckCircle, BsCheckLg } from "react-icons/bs";
import Connection from "../constants/Connections";
import Modal from "react-bootstrap/Modal";
import Header from "../components/header";
import { BsArrowBarLeft } from "react-icons/bs";

function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [license, setLicense] = useState("Select License");
  const [Period, setPeriod] = useState("monthly");
  const [showpass, setShowPass] = useState(false);
  const [selected, setSelected] = useState({
    checked: false,
    active: "",
  });

  const navigate = useNavigate();
  const Goback = () => {
    navigate(-1);
  };
  const [input, setInput] = useState({
    firstname: "",
    firsths: false,
    firstbc: false,
    firstht: "",

    middlename: "",
    middlehs: false,
    middlebc: false,
    middleht: "",

    lastname: "",
    lasths: false,
    lastbc: false,
    lastht: "",

    emailaddress: "",
    emailhs: false,
    emailbc: false,
    emailht: "",

    phone: "",
    phonehs: false,
    phonebc: false,
    phoneht: "",

    address: "",
    addresshs: false,
    addressbc: false,
    addressht: "",

    username: "",
    usernamehs: false,
    usernamebc: false,
    usernameht: "",

    password: "",
    passwordhs: false,
    passwordbc: false,
    passwordht: "",

    confirmpassword: "",
    confirmhs: false,
    confirmbc: false,
    confirmht: "",

    licensehs: false,
    licensebc: false,
    licenseht: "",

    paymentmhs: false,
    paymentmht: "",


    referralCode: "",

    errormessage: "",
  });
  const [coupon, setCoupon] = useState("");
  const [couponprops, setCouponProps] = useState({
    errormsg: "",
    showerr: false,
    successmsg: "",
    showsuccess: false,
    loading: false,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //update first name
  const UpdateFname = (event) => {
    setInput({
      ...input,
      firstname: event.target.value,
      firsths: false,
      firstbc: false,
      firstht: "",
    });
  };

  //update middle name
  const UpdateMname = (event) => {
    setInput({
      ...input,
      middlename: event.target.value,
      middlehs: false,
      middlebc: false,
      middleht: "",
    });
  };

  //update first name
  const UpdateLname = (event) => {
    setInput({
      ...input,
      lastname: event.target.value,
      lasths: false,
      lastbc: false,
      lastht: "",
    });
  };

  //update email address
  const UpdateEmail = (event) => {
    setInput({
      ...input,
      emailaddress: event.target.value,
      emailhs: false,
      emailbc: false,
      emailht: "",
    });
  };

  //update phone name
  const UpdatePhone = (event) => {
    setInput({
      ...input,
      phone: event.target.value,
      phonehs: false,
      phonebc: false,
      phoneht: "",
    });
  };

  //update address
  const UpdateAddress = (event) => {
    setInput({
      ...input,
      address: event.target.value,
      addresshs: false,
      addressbc: false,
      addressht: "",
    });
  };

  //update  password
  const UpdatePassword = (event) => {
    setInput({
      ...input,
      password: event.target.value,
      passwordhs: false,
      passwordbc: false,
      passwordht: "",
    });
  };

  //update phone name
  const UpdateConfirmPass = (event) => {
    setInput({
      ...input,
      confirmpassword: event.target.value,
      confirmhs: false,
      confirmbc: false,
      passwordht: "",
    });
  };

  const UpdateCouponCode = (event) => {
    setCoupon(event.target.value);
  };
//update Referral Code
  const UpdateReferral = (event) => {
    setInput({
      ...input,
      referralCode: event.target.value,
    
    });
  };

  const Select = (id) => {
    setSelected({
      ...selected,
      active: id,
    });
    setInput({
      ...input,
      paymentmht: "",
    });
  };

  // the phone number to be sent to puresight
  //which a character at the start of phone number shouldn't contain any special character

  const MakeitPhone = (phone) => {
    var FirstChar = phone.charAt(0);
    var Phoneno = phone;
    var ccode = "251";

    if (FirstChar === "+") {
      Phoneno = phone.slice(1, phone.length - 1);
    } else if (FirstChar === 0) {
      Phoneno = parseInt(ccode) + phone.slice(1, phone.length - 1);
    }

    return Phoneno;
  };

  const ApplyCoupon = () => {
    setCouponProps({
      ...couponprops,
      loading: true,
    });

    if (coupon === "") {
      setCouponProps({
        ...couponprops,
        errormsg: "First enter coupon code",
        showerr: true,
        loading: false,
      });
    } else if (coupon.length <= 4) {
      setCouponProps({
        ...couponprops,
        errormsg: "Coupon code must be more than four character",
        showerr: true,
        loading: false,
      });
    } else {
      setCouponProps({
        ...couponprops,
        errormsg: "",
        showerr: false,
        loading: true,
      });

      var Api = Connection.api + Connection.coupon + coupon;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var data = {
        ccode: coupon,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === "exist") {
            setCouponProps({
              ...couponprops,
              successmsg: "Successfully Applied Coupon Code!",
              showsuccess: true,
              loading: false,
            });
          } else {
            setCouponProps({
              ...couponprops,
              errormsg: "Coupon Code doesn't exist or expired!",
              showerr: true,
              successmsg: "",
              showsuccess: false,
              loading: false,
            });
          }
        })
        .catch((e) => {
          setCouponProps({
            ...couponprops,
            errormsg: "Error Applying Coupon Code!",
            showerr: true,
            loading: false,
          });
        });
    }
  };
  //validate user input when user pressed submit button
  const CreateCAccount = () => {
    var packages = `AFROMINA_${license}`; //packages id to be sent to puresight
    const re = /\S+@\S+\.\S+/;

    if (input.firstname === "") {
      setInput({
        ...input,
        firsths: true,
        firstbc: true,
        firstht: "Enter first name",
      });
      document.getElementById("form1").focus();
      return false;
    } else if (input.middlename === "") {
      setInput({
        ...input,
        middlehs: true,
        middlebc: true,
        middleht: "Enter middle name",
      });
      document.getElementById("form2").focus();
      return false;
    } else if (input.lastname === "") {
      setInput({
        ...input,
        lasths: true,
        lastbc: true,
        lastht: "Enter last name",
      });
      document.getElementById("form9").focus();
      return false;
    } else if (input.emailaddress === "") {
      setInput({
        ...input,
        emailhs: true,
        emailbc: true,
        emailht: "Enter email address",
      });
      document.getElementById("form3").focus();
      return false;
    } else if (!re.test(input.emailaddress)) {
      setInput({
        ...input,
        emailhs: true,
        emailbc: true,
        emailht: "email must contain @ and . symbols",
      });
      document.getElementById("form3").focus();
      return false;
    } else if (input.phone === "") {
      setInput({
        ...input,
        phonehs: true,
        phonebc: true,
        phoneht: "Enter phone number",
      });
      document.getElementById("form4").focus();
      return false;
    } else if (input.password === "") {
      setInput({
        ...input,
        passwordhs: true,
        passwordbc: true,
        passwordht: "Enter password",
      });
      document.getElementById("form7").focus();
      return false;
    } else if (input.password !== input.confirmpassword) {
      setInput({
        ...input,
        confirmhs: true,
        confirmbc: true,
        passwordht: "Password doesn't match!",
      });
      document.getElementById("form8").focus();
      return false;
    } else if (license === "Select License") {
      setInput({
        ...input,
        licensebc: true,
        licensehs: true,
        licenseht: "Select License",
      });
      document.getElementById("license").focus();
      return false;
    } else if (selected.active === "") {
      setInput({
        ...input,
        paymentmht: "Please select payment option!",
      });

      return false;
    } else {
      setLoading(true);
      var Api = Connection.api + Connection.customers; // update this line of code to the something like 'http://localhost:3000/customers?_page=${currentPage}&_limit=${limit}
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      const data = {
        firstname: input.firstname,
        middlename: input.middlename,
        lastname: input.lastname,
        emailaddress: input.emailaddress,
        phone: MakeitPhone(input.phone),
        address: input.address,
        username: input.emailaddress,
        password: input.password,
        subscription: Period,
        license: license,
        coupon: coupon,
        referral: input.referralCode,
        payment: selected.active,
        package: packages,
        status: 0,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "success") {
            window.location.href = response.data.checkout_url;
          } else if (response === "0") {
            setInput({
              ...input,
              errormessage: "Successfully Created!",
            });
            handleShow();
            setLoading(false);
          } else if (response === "1001") {
            setInput({
              ...input,
              errormessage: "There is Missing Parameter!",
            });
            setLoading(false);
          } else if (response === "1002") {
            setInput({
              ...input,
              errormessage: "Invalid Username or Password!",
            });
            setLoading(false);
          } else if (response === "1004") {
            setInput({
              ...input,
              errormessage: "Invalid Package Id!",
            });
            setLoading(false);
          } else if (response === "1021") {
            setInput({
              ...input,
              errormessage: "Email already exist!",
            });
            setLoading(false);
          } else if (response === "1022") {
            setInput({
              ...input,
              errormessage: "Phone number already exist!",
            });
            setLoading(false);
          } else if (response === "500") {
            setInput({
              ...input,
              errormessage: "Error creating Account retry later!",
            });
            setLoading(false);
          } else {
            setInput({
              ...input,
              errormessage: "Unable to create account, retry later!",
            });
            setLoading(false);
          }
        })
        .catch((e) => {
          setInput({
            ...input,
            errormessage: "There is error creating account!",
          });
          setLoading(false);
        });
    }
    return true;
  };

  return (
    <div
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
      className="m-auto "
    >
      <Header />
      <Container
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        <Row>
          <Col
            sm={10}
            className=" m-auto p-4 pb-0 mt-4 mb-3 rounded shadow bg-white"
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          >
            <MDBContainer
              className=""
              style={{
                backgroundColor: "var(--sec-bg)",
                color: "var(--text-color)",
              }}
            >
              <MDBRow
                sm={10}
                className="d-flex justify-content-center align-items-center h-100 "
              >
                <MDBCol>
                  <MDBCard
                    className="my-4 "
                    style={{
                      backgroundColor: "var(--sec-bg)",
                      color: "var(--text-color)",
                    }}
                  >
                    <form className="needs-validation" noValidate>
                      <MDBRow className="g-0">
                        <MDBCol sd="6">
                          <MDBCardBody
                            className="text-black d-flex flex-column justify-content-center "
                            style={{
                              backgroundColor: "var(--sec-bg)",
                              color: "var(--text-color)",
                            }}
                          >
                            <h4
                              className="mb-4 text-uppercase fw-bold"
                              style={{
                                backgroundColor: "var(--sec-bg)",
                                color: "var(--text-color)",
                              }}
                            >
                              Create Account
                            </h4>

                            <MDBRow
                              style={{
                                backgroundColor: "var(--sec-bg)",
                                color: "var(--text-color)",
                              }}
                              className="mb-3"
                            >
                              <p className="fw-semibold primary-text">
                                Add User Information
                              </p>
                              <MDBCol sm="6">
                                <MDBInput
                                  wrapperClass="mb-1 "
                                  placeholder="First Name"
                                  size="md"
                                  id="form1"
                                  type="text"
                                  required
                                  defaultValue={input.firstname}
                                  onChange={UpdateFname}
                                  style={{
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                  }}
                                  className={
                                    input.firstbc ? "border-danger" : ""
                                  }
                                />
                                <p className="small text-danger fw-semibold">
                                  {" "}
                                  {input.firstht}
                                </p>
                              </MDBCol>

                              <MDBCol sm="6">
                                <MDBInput
                                  wrapperClass="mb-1"
                                  placeholder="Middle Name"
                                  size="md"
                                  id="form2"
                                  type="text"
                                  required
                                  defaultValue={input.middlename}
                                  onChange={UpdateMname}
                                  style={{
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                  }}
                                  className={
                                    input.middlebc ? "border-danger" : ""
                                  }
                                />
                                <p className="small text-danger fw-semibold">
                                  {" "}
                                  {input.middleht}
                                </p>
                              </MDBCol>
                            </MDBRow>
                            <MDBInput
                              wrapperClass="mb-1"
                              placeholder="Last Name"
                              size="md"
                              id="form9"
                              type="text"
                              required
                              defaultValue={input.lastname}
                              onChange={UpdateLname}
                              style={{
                                backgroundColor: "var(--input-bg)",
                                color: "var(--text-color)",
                              }}
                              className={input.lastht ? "border-danger" : ""}
                            />
                            <p className="small text-danger fw-semibold">
                              {" "}
                              {input.lastht}
                            </p>
                            <MDBRow
                              style={{
                                backgroundColor: "var(--sec-bg)",
                                color: "var(--text-color)",
                              }}
                              className="mb-3"
                            >
                              <MDBCol sm="6">
                                <MDBInput
                                  wrapperClass="mb-2"
                                  placeholder="Email Address"
                                  size="md"
                                  id="form3"
                                  type="email"
                                  required
                                  defaultValue={input.emailaddress}
                                  onChange={UpdateEmail}
                                  style={{
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                  }}
                                  className={
                                    input.emailbc ? "border-danger" : ""
                                  }
                                />
                                <p className="small text-danger fw-semibold">
                                  {" "}
                                  {input.emailht}
                                </p>
                              </MDBCol>

                              <MDBCol sm="6">
                                <MDBInput
                                  wrapperClass="mb-2"
                                  placeholder="Phone"
                                  size="md"
                                  id="form4"
                                  type="phone"
                                  required
                                  defaultValue={input.phone}
                                  onChange={UpdatePhone}
                                  style={{
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                  }}
                                  className={
                                    input.phonebc ? "border-danger" : ""
                                  }
                                />
                                <p className="small text-danger fw-semibold">
                                  {" "}
                                  {input.phoneht}
                                </p>
                              </MDBCol>
                            </MDBRow>

                            <MDBInput
                              wrapperClass="mb-2"
                              placeholder="Living Address"
                              size="md"
                              id="form5"
                              type="address"
                              defaultValue={input.address}
                              onChange={UpdateAddress}
                              style={{
                                backgroundColor: "var(--input-bg)",
                                color: "var(--text-color)",
                              }}
                              className="inputBorder"
                            />

                            <p className="fw-semibold primary-text mt-3">
                              Account Credentials
                            </p>
                            <hr className="primary-text mt-0" />

                            <MDBRow
                              style={{
                                backgroundColor: "var(--sec-bg)",
                                color: "var(--text-color)",
                              }}
                              className="mb-3"
                            >
                              <MDBCol sm="6">
                                <MDBInput
                                  wrapperClass="mb-2"
                                  placeholder="Password"
                                  autoComplete="off"
                                  size="md"
                                  id="form7"
                                  type={showpass ? "text" : "password"}
                                  required
                                  defaultValue={input.password}
                                  onChange={UpdatePassword}
                                  style={{
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                  }}
                                  className={
                                    input.passwordbc ? "border-danger" : ""
                                  }
                                />
                                <p className="small text-danger fw-semibold">
                                  {" "}
                                  {input.passwordht}
                                </p>
                              </MDBCol>

                              <MDBCol
                                sm="6"
                                className="d-flex position-relative"
                              >
                                <MDBInput
                                  wrapperClass={input.passmatch + "mb-4"}
                                  placeholder="Confirm Password"
                                  autoComplete="off"
                                  size="md"
                                  id="form8"
                                  type={showpass ? "text" : "password"}
                                  required
                                  defaultValue={input.confirmpassword}
                                  onChange={UpdateConfirmPass}
                                  style={{
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                  }}
                                  className={
                                    input.confirmbc ? "border-danger" : ""
                                  }
                                />
                                <Button
                                  title="show password"
                                  onClick={() => setShowPass(!showpass)}
                                  variant="light"
                                  className="position-absolute end-0 text-center primary-fill text-dark rounded-0 rounded-end border-3  me-2 "
                                >
                                  {showpass ? (
                                    <AiOutlineEye
                                      size={22}
                                      className="me-1 pb-1"
                                    />
                                  ) : (
                                    <AiOutlineEyeInvisible
                                      size={22}
                                      className="me-1 pb-1"
                                    />
                                  )}
                                </Button>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow
                              style={{
                                backgroundColor: "var(--sec-bg)",
                                color: "var(--text-color)",
                              }}
                              className="mb-3"
                            >
                              <MDBCol>
                                <Dropdown size="md">
                                  <Dropdown.Toggle
                                    variant="light"
                                    title="Licenses"
                                    id="license"
                                    className={
                                      input.licensebc
                                        ? "border-danger border m-0 me-5  font-link"
                                        : "border m-0 me-5  font-link"
                                    }
                                    style={{
                                      backgroundColor: "var(--input-bg)",
                                      color: "var(--text-color)",
                                    }}
                                  >
                                    {license === "Select License"
                                      ? "Select License"
                                      : license + " License"}
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu variant="light" id="licenses">
                                    <Dropdown.Item
                                      onClick={() => setLicense(0)}
                                    >
                                      Select License
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setLicense(5)}
                                    >
                                      5 License
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setLicense(10)}
                                    >
                                      10 License
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setLicense(15)}
                                    >
                                      15 License
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                                <p className="small text-danger fw-semibold">
                                  {" "}
                                  {input.licenseht}
                                </p>
                              </MDBCol>

                              <MDBCol>
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="light"
                                    title="1 License"
                                    id="dropdown-basic"
                                    className="primary-fill border-0 text-dark fw-medium font-link"
                                  >
                                    {Period}
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu variant="light">
                                    <Dropdown.Item
                                      onClick={() => setPeriod("monthly")}
                                    >
                                      Monthly
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setPeriod("annual")}
                                    >
                                      Annual
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </MDBCol>
                            </MDBRow>
                          </MDBCardBody>
                        </MDBCol>

                        <MDBCol
                          md="10"
                          lg="6"
                          className="order-1 order-lg-2 border-start-1 align-items-center"
                        >
                          <MDBRow className="">
                            <MDBRow className="mt-4 pt-4 ms-3">
                              <MDBCol className=" pt-4">
                                <p className="fw-semibold primary-text ">
                                  Promo Section
                                </p>

                                <div class="input-group mb-2 w-75">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Coupon Code"
                                    aria-label="Coupon Code"
                                    aria-describedby="button-addon2"
                                    style={{
                                      backgroundColor: "var(--input-bg)",
                                      color: "var(--text-color)",
                                    }}
                                    value={coupon}
                                    onChange={UpdateCouponCode}
                                  />
                                  <button
                                    className="btn btn-outline-success "
                                    type="button"
                                    id="button-addon2"
                                    onClick={() => ApplyCoupon()}
                                  >
                                    {couponprops.loading ? (
                                      <div
                                        class="spinner-border spinner-border-sm primary-bg"
                                        role="status"
                                      >
                                        <span class="visually-hidden">
                                          Loading...
                                        </span>
                                      </div>
                                    ) : (
                                      <BsCheckLg size={22} color="primary" />
                                    )}
                                  </button>
                                </div>
                                {couponprops.showsuccess ? (
                                  <p className="text-success bg-success bg-opacity-10 px-3  w-75 p-1 rounded small">
                                    {couponprops.successmsg}
                                  </p>
                                ) : couponprops.showerr ? (
                                  <p className="text-danger bg-danger bg-opacity-10 px-3  w-75 p-1 rounded small">
                                    {couponprops.errormsg}
                                  </p>
                                ) : null}

                                <MDBInput
                                  wrapperClass="mb-1"
                                  placeholder="Referral Code"
                                  size="md"
                                  id="form9"
                                  type="text"
                                  required
                                  defaultValue={input.referralCode}
                                  onChange={UpdateReferral}
                                  style={{
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                  }}
                                  className= "w-75 mt-4"
                                  
                                />
                              </MDBCol>
                            </MDBRow>
                          </MDBRow>

                          <MDBRow className="mt-5 pt-1 ms-1">
                            <MDBCol>
                              <p className="fw-semibold primary-text ps-3">
                                Choose payment method
                              </p>
                              <hr className="primary-text mt-0 ms-3" />
                            </MDBCol>
                          </MDBRow>

                          <MDBRow>
                            <div className="m-4 d-flex justify-content-center align-items-center">
                              {Gateways.map((item) => (
                                <div
                                  key={item.id}
                                  className={
                                    selected.active === item.id
                                      ? " d-flex m-1 border rounded p-2 pt-2 pb-0 border-success align-items-center justify-content-center cursor-pointer"
                                      : "d-flex   m-1 border rounded p-2 pt-2 pb-0  align-items-center justify-content-center cursor-pointer "
                                  }
                                  onClick={() => Select(item.id)}
                                >
                                  <div className="m-2 mt-0 mb-0 justify-content-center ">
                                    <img
                                      src={item.icon}
                                      width="50"
                                      height="50"
                                      alt="icon"
                                      className="rounded m-1"
                                    />
                                    <div className="d-flex text-center cursor-pointer">
                                      <FormCheck
                                        aria-label="checkbox"
                                        checked={
                                          selected.active === item.id
                                            ? true
                                            : false
                                        }
                                        onChange={() => Select(item.id)}
                                        className="align-self-start me-2 "
                                      />
                                      {item.name}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="small text-danger fw-semibold text-center">
                              {" "}
                              {input.paymentmht}
                            </p>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-end align-items-center pt-3 p-3">
                        <p className="text-danger mx-4 text-center m-auto justify-content-center align-items-center">
                          {input.errormessage}
                        </p>

                        <NavLink
                          onClick={Goback}
                          className="text-secondary border rounded px-3 py-1 fw-semibold ms-2 mb-3 my-3  float-end"
                        >
                          <BsArrowBarLeft size={18} /> Back
                        </NavLink>

                        <Button
                          type="button"
                          variant="light"
                          size="md"
                          className="ms-3 bg-primary text-white border-0 px-5"
                          onClick={() => CreateCAccount()}
                          disabled={loading ? true : false}
                        >
                          {loading ? (
                            <div
                              class="spinner-border spinner-border-sm text-secondary"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <span>Create Account</span>
                          )}
                        </Button>
                      </div>
                    </form>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </Col>
        </Row>
        <Modal
          show={show}
          onHide={handleClose}
          style={{
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
          }}
        >
          <Modal.Header closeButton />
          <Modal.Body
            style={{
              backgroundColor: "var(--sec-bg)",
              color: "var(--text-color)",
            }}
          >
            <Row>
              <Col
                sm={10}
                className=" text-center align-items-center justify-content-center  m-auto p-3  mt-2 mb-1 "
              >
                <BsCheckCircle size={66} className="text-success m-3" />
                <p className="fs-5 ">Successfully Created</p>
                <p className="fs-6 text-muted">
                  {" "}
                  We will send you an email as soon as your account get
                  activated!
                </p>

                <Row className="d-flex justify-content-evenly align-items-center m-auto mt-5 w-50">
                  <Col>
                    <Link
                      onClick={() => handleClose()}
                      to="/account"
                      variant="light"
                      className="
                d-flex justify-content-center align-items-center
                btn btn-light
                text-decoration-none text-dark fw-semibold "
                    >
                      Back
                    </Link>
                  </Col>

                  <Col>
                    <Link
                      to="/"
                      variant="light"
                      className="
                d-flex justify-content-evenly align-self-center
                text-decoration-none text-dark btn primary-fill text-dark "
                    >
                      Home
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default CreateAccount;
