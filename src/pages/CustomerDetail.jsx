import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import { BsArrowBarLeft, BsArrowLeftCircle } from "react-icons/bs";

function CustomerDetail() {
  const navigate = useNavigate();
  const Goback = () => {
    navigate(-1);
  };
  const { state } = useLocation();
  const customer = state == null ? "" : state;
  const [user, setUser] = useState({
    fname: customer.first_name === null ? "" : customer.first_name,
    mname: customer.middle_name === null ? "" : customer.middle_name,
    lname: customer.lname === null ? "" : customer.lname,
    status: customer.status === null ? "" : customer.status,
    license: customer.license === null ? "" : customer.license,
    subscription: customer.subscription === null ? "" : customer.subscription,
    duedate: customer.duedate === null ? "" : customer.duedate,
    email: customer.email === null ? "" : customer.email,
    phone: customer.phone === null ? "" : customer.phone,
    date: customer.created_at === null ? "" : customer.created_at,
    address: customer.address === null ? "" : customer.address,
    payment_method:
      customer.payment_method === null ? "" : customer.payment_method,
  });
  const [pmodal, setPModal] = useState("Telebirr");
  const [renew, setRenew] = useState(false);
  const [upgrade, setUpgrade] = useState(false);

  const Status = (status) => {
    var Status;

    switch (status) {
      case "1":
        Status = "Active";
        break;
      case "2":
        Status = "Expired";
        break;

      case "3":
        Status = "Terminated";
        break;
      default:
        Status = "Pending";
    }

    return Status;
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

  const Renew = () => {
    setUpgrade(false);
    setRenew(!renew);
  };
  const UpgradeSub = () => {
    setRenew(false);
    setUpgrade(true);
  };

  const ConfirmRenewal = () => {
    alert("all is well");
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
                {user.status === "1" ? (
                  <span class="  bg-opacity-10 text-success pe-1 rounded-1">
                    {Status(user.status)}
                  </span>
                ) : user.status === "2" ? (
                  <span class="badge bg-danger bg-opacity-10 text-danger pe-1 rounded-1">
                    {Status(user.status)}
                  </span>
                ) : user.status === "3" ? (
                  <span class="badge bg-dark bg-opacity-10 text-dark pe-1 rounded-1">
                    {Status(user.status)}
                  </span>
                ) : (
                  <span class="badge bg-secondary bg-opacity-10 text-secondary pe-1 rounded-1">
                    {Status(user.status)}
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
                className=" bg-white f small  rounded shadow-sm text-primary mt-3"
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
                    450 ETB
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
                        {pmodal}
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="light">
                        <Dropdown.Item
                          onClick={() => setPModal("Telebirr")}
                          active
                        >
                          Telebirr
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setPModal("Chapa")}>
                          Chapa
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setPModal("CBE Birr")}>
                          CBE Birr
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => setPModal("CBE Account")}>
                          CBE Account
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </p>
                </div>
                <button
                  type="button"
                  id="primarybtn"
                  className="btn  mt-4 form-control"
                  onClick={() => ConfirmRenewal()}
                >
                  Renew
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
    </>
  );
}

export default CustomerDetail;
