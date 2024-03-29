import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { BsArrowBarLeft } from "react-icons/bs";
import Channels from "../data/paymentChannels";
import Connection from "../constants/Connections";
import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import packages from "../data/packages";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomerDetail() {
  const navigate = useNavigate();
  const Goback = () => {
    navigate(-1);
  };
  const { state } = useLocation();
  const customer = state == null ? "" : state;

  const [user] = useState({
    fname: customer.first_name === null ? "" : customer.first_name,
    mname: customer.middle_name === null ? "" : customer.middle_name,
    lname: customer.lname === null ? "" : customer.lname,
    status: customer.status === null ? "" : parseInt(customer.status),
    license: customer.license === null ? "" : parseInt(customer.license),
    subscription: customer.subscription === null ? "" : customer.subscription,
    duedate: customer.duedate === null ? "" : customer.duedate,
    email: customer.email === null ? "" : customer.email,
    phone: customer.phone === null ? "" : customer.phone,
    date: customer.created_at === null ? "" : customer.created_at,
    address: customer.address === null ? "" : customer.address,
    payment_method:
      customer.payment_method === null ? "" : customer.payment_method,
  });
  const [pmodal, setPModal] = useState("1001");
  const [renew, setRenew] = useState(false);
  const [renewLoader, setRenewLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [responseMsg, setResponseMsg] = useState({
    severity: "success",
    content: "",
    status: false,
  });

  const device = packages.find((license) => license.device === user.license);
  const price = device[user.subscription + "_price"];

  const choseen = Channels.find((channel) => channel.id === pmodal);

  //handles a snackbar close function
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const DateSlice = (date) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    return day + "/" + month + "/" + year;
  };

  //calculate and return the license expire date
  const ExpireDate = (date) => {
    var duedate;

    if (date == null) {
      duedate = "Not payed!";
    } else {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      duedate = day + "/" + month + "/" + year;
    }
    return duedate;
  };

  const Payment = (mode) => {
    var gateway;
    switch (mode) {
      case 1000:
        gateway = "With Cash";
        break;
      case 1001:
        gateway = "Chapa";
        break;
      case 1002:
        gateway = "Telebirr";
        break;
      default:
        gateway = "With Cash";
    }

    return gateway;
  };
  // const price = packages.find((license) => license.device === user.license)[
  //   user.subscription + "_price"
  // ];

  const Renew = () => {
    setRenew(!renew);
  };
  // const UpgradeSub = () => {
  //   setRenew(false);
  //   setUpgrade(true);
  // };

  const getCsrfToken = async () => {
    var Api = Connection.api;
    const response = await fetch(Api + "/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });
    if (response.ok) {
      const data = await response.json();
      return data.csrf_token;
    }
    throw new Error("Failed to retrieve CSRF token");
  };

  const handleRenewal = async () => {
    setRenewLoader(true);
    var Api = Connection.api + Connection.renew + customer.id;

    const token = await getCsrfToken();
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    };
    var data = {
      id: customer.id,
      channel: pmodal,
    };
    fetch(Api, {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.original.status === "success") {
          setRenewLoader(false);
          setResponseMsg({
            ...responseMsg,
            severity: "info",
            content: "Redirecting to payment gateway...",
            status: true,
          });
          setOpen(true);
          window.location.href = response.original.data.checkout_url;
        } else {
          setRenewLoader(false);
          setResponseMsg({
            ...responseMsg,
            severity: "error",
            content: "We couldn't renew your license for now retry later ",
            status: true,
          });
          setOpen(true);
        }
      })
      .catch((e) => {
        setRenewLoader(false);
        setResponseMsg({
          ...responseMsg,
          severity: "error",
          content: "There is error renewing your license",
          status: true,
        });
        setOpen(true);
      });
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5 shadow bg-whiten py-3 rounded px-3 pt-4">
          <Col sm={8}>
            <div className="d-flex justify-content-between ">
              <p className="text-muted fw-semibold fs-5 ms-1 ps-1">
                Customer Details
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-1 rounded">
              <p className=" my-auto">Customer Fullname</p>
              <p className="fw-semibold text-muted  my-auto text-capitalize">
                {user.fname} {user.mname}
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">Status</p>
              <p className="fw-semibold text-muted  my-auto text-capitalize">
                {user.status == 1 ? (
                  <span class="  bg-opacity-10 text-success pe-1 rounded-1">
                    Active
                  </span>
                ) : user.status == 2 ? (
                  <span class="badge bg-danger bg-opacity-10 text-danger pe-1 rounded-1">
                    Expired
                  </span>
                ) : user.status == 3 ? (
                  <span class="badge bg-dark bg-opacity-10 text-dark pe-1 rounded-1">
                    Terminated
                  </span>
                ) : (
                  <span class="badge bg-secondary bg-opacity-10 text-secondary pe-1 rounded-1">
                    Pending
                  </span>
                )}
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">License</p>
              <p className="fw-semibold text-muted  my-auto">
                {user.license} Device
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">Subscription</p>
              <p className="fw-semibold text-muted  my-auto text-capitalize">
                {user.subscription}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">Due Date</p>
              <p className="fw-semibold text-muted  my-auto">
                {user.status == 0 ? "Not Activated" : ExpireDate(user.duedate)}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">Email</p>
              <p className="fw-semibold text-muted  my-auto">{user.email}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">Phone</p>
              <p className="fw-semibold text-muted  my-auto">{user.phone}</p>
            </div>

            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">Subscription Date</p>
              <p className="fw-semibold text-muted  my-auto">
                {DateSlice(user.date)}
              </p>
            </div>

            {user.address ? (
              <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
                <p className=" my-auto">Address</p>
                <p className="fw-semibold text-muted  my-auto">
                  {user.address}
                </p>
              </div>
            ) : null}

            <div className="d-flex justify-content-between align-items-center px-2 bg-light py-2 mt-2 rounded">
              <p className=" my-auto">Payment Channel</p>
              <p className="fw-semibold text-muted  my-auto">
                {Payment(user.payment_method)}
              </p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="bg-light rounded mt-5 pt-2 p-4 ">
              <Button
                onClick={() => Renew()}
                id="primarybtn"
                className="border-0 fw-semibold small mt-3  rounded shadow-sm text-white"
              >
                Renew License
              </Button>
              {/* 
              <Button
                onClick={() => UpgradeSub()}
                className=" bg-white  small  rounded shadow-sm text-primary mt-3"
              >
                Upgrade Subscription
              </Button> */}
            </div>
            {renew ? (
              <div className="bg-info bg-opacity-10 rounded mt-2 pt-2 p-4 border  ">
                <div className="d-flex justify-content-between align-items-center px-2 py-2 mt-2 rounded">
                  <p className=" my-auto">License</p>
                  <p className="fw-semibold text-muted  my-auto">
                    {user.license} Device
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center px-2  py-2  rounded">
                  <p className=" my-auto">Subscription </p>
                  <p className="fw-semibold text-muted  my-auto text-capitalize">
                    {user.subscription}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center px-2  py-2  rounded">
                  <p className=" my-auto">Fee Amount </p>
                  <p className="fw-semibold text-muted  my-auto text-capitalize">
                    {price} ETB
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center px-2  py-2  rounded">
                  <p className=" my-auto">Pay With </p>
                  <p className=" my-auto">
                    <Dropdown className="">
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        variant="light"
                        className="border"
                      >
                        {choseen.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="light">
                        {Channels.map((channel) => (
                          <Dropdown.Item
                            onClick={() => setPModal(channel.id)}
                            active
                          >
                            {channel.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </p>
                </div>
                <button
                  type="button"
                  id="primarybtn"
                  className="btn  mt-4 form-control"
                  onClick={() => handleRenewal()}
                >
                  {renewLoader ? (
                    <div
                      class="spinner-border spinner-border-sm text-white"
                      role="status"
                    ></div>
                  ) : (
                    <span>Renew</span>
                  )}
                </button>
              </div>
            ) : null}
          </Col>
          <Row>
            <Col>
              <NavLink
                onClick={Goback}
                className="text-secondary border rounded px-3 py-1 fw-semibold ms-2 mb-3 my-3  float-end"
              >
                <BsArrowBarLeft size={18} /> Back
              </NavLink>
            </Col>
          </Row>
        </Row>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert
          onClose={handleSnackClose}
          severity={responseMsg.severity}
          sx={{ width: "100%" }}
        >
          {responseMsg.content}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomerDetail;
