import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import Connection from "../constants/Connections";
import { BsCheckCircle } from "react-icons/bs";
import Header from "../components/header";


const CustomerDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { state } = useLocation();
  const [actionload, setactionload] = useState(false);
  //modal dynamic attributes
  const [initialValue, setInitialValue] = useState({
    title: "",
    currentPlan: "",
    updatedInfo: "",
    operation: "",
    cofirmationtxt: "",
    errormsg: "",
    lid: "",
    cid: "",
  });

  //modal dropdown license listing states
  const [license, setLicense] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [confirm, setConfirm] = useState(false);

  const DateSlice = (date) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    return day + "/" + month + "/" + year;
  };
  const Status = (status) => {
    var Status;

    switch (status) {
      case 1:
        Status = "Active";
        break;
      case 2:
        Status = "Expired";
        break;

      case 3:
        Status = "Terminated";
        break;
      default:
        Status = "Pending";
    }

    return Status;
  };
    //calculate and return the license expire date
    const ExpireDate = (date) => {
      var duedate;
  
      if(date == null){
         duedate = "Not payed!";
      }
      else{
  
      
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

  const OpenDialog = (item, operation) => {
    var info = operation === "add" ? "Upgrade to" : "Downgrade to";

    if (operation === "add") {
      setConfirm("1");
      setInitialValue({
        ...initialValue,
        title: "Add Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
        lid: item.id,
        cid: item.remote_id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    } else if (operation === "remove") {
      setConfirm("1");
      setInitialValue({
        ...initialValue,
        title: "Remove Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
        lid: item.id,
        cid: item.remote_id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    }
    //when the user clicked deactivate account button from dropdown
    else if (operation === "deactivate") {
      setConfirm("2");
      setInitialValue({
        ...initialValue,
        title: "Deactivate Account!",
        cofirmationtxt:
          "Are you sure do you want to deactivate this user account!",
        operation: operation,
        lid: item.id,
        cid: item.remote_id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    } else {
      setConfirm("2");
      setInitialValue({
        ...initialValue,
        title: "Detach Credentials",
        cofirmationtxt:
          "Are you sure do you want to Detach this user credentials!",
        operation: operation,
        lid: item.id,
        cid: item.remote_id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    }
  };
   // add License functionality
  //adding license to databse go performed here
  const UpdateID = (event) => {
    setInitialValue({
      ...initialValue,
      cid: event.target.value,
      errormsg: "",
    });
  };

 
  const AddSubscription = () => {
    var packages = `AFROMINA_${license}`;

    if (initialValue.currentPlan === 15) {
      setInitialValue({
        ...initialValue,
        errormsg: "You are using the maximum plan of Surfi Ethiopia!",
      });
    } else if (license <= initialValue.currentPlan) {
      setInitialValue({
        ...initialValue,
        errormsg: "Selected a license supports same or less devices!",
      });
    } else if (initialValue.cid !== "" && initialValue.currentPlan < 15) {
      setactionload(true);

      var Api = Connection.api + Connection.addlicense + initialValue.lid;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        remoteid: initialValue.cid,
        localid: initialValue.lid,
        license: license,
        package: packages,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // the action will be taken depending on the server response
          console.log(response);
          if (response == 0) {
            setConfirm("3");
            setInitialValue({
              ...initialValue,
              cofirmationtxt: `Succeessfully Upgraded to ${license} device license`,
              errormsg: "",
            });
            setactionload(false);
          } else if (response == 1001) {
            setInitialValue({
              ...initialValue,
              cofirmationtxt: "",
              lid: "",
              cid: "",
              errormsg: "Mandatory parameter missing!",
            });
            setactionload(false);
          } else if (response == 1002) {
            setInitialValue({
              ...initialValue,
              errormsg: "Invalid Username or Password!",
            });
            setactionload(false);
          } else if (response == 1003) {
            setInitialValue({
              ...initialValue,
              errormsg: "Already Subscribed!",
            });
            setactionload(false);
          } else if (response == 1004) {
            setInitialValue({
              ...initialValue,
              errormsg: "Invalid Package Id!",
            });
            setactionload(false);
          } else if (response == 1021) {
            setInitialValue({
              ...initialValue,
              errormsg: "Email already exist!",
            });
            setactionload(false);
          } else if (response == 1022) {
            setInitialValue({
              ...initialValue,
              errormsg: "Phone number already exist!",
            });
            setactionload(false);
          } else {
            setInitialValue({
              ...initialValue,
              errormsg: "Failed to to upgrade license",
            });
            setactionload(false);
          }
        });
    } else {
      setInitialValue({
        ...initialValue,
        errormsg: "Please enter remote customer id!",
      });
      setactionload(false);
    }
  };

  // remove the subscription
  const RemoveSubscription = () => {
    var currentPackages = `AFROMINA_${initialValue.currentPlan}`;
    var packages = `AFROMINA_${license}`;

    if (initialValue.currentPlan === 5) {
      setInitialValue({
        ...initialValue,
        errormsg: "You are using the minimum plan of Surfi Ethiopia!",
      });
    } else if (license >= initialValue.currentPlan) {
      setInitialValue({
        ...initialValue,
        errormsg: "Selected a license supports same or more devices!",
      });
    } else if (initialValue.cid !== "" && initialValue.currentPlan > 5) {
      setactionload(true);

      var Api = Connection.api + Connection.removeLicense + initialValue.lid;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        remoteid: initialValue.cid,
        localid: initialValue.lid,
        license: license,
        package: packages,
        currentPackage: currentPackages,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // the action will be taken depending on the server response

          if (response == 0) {
            setConfirm("3");
            setInitialValue({
              ...initialValue,
              cofirmationtxt: `Succeessfully Downgraded license to ${license} device license`,
              errormsg: "",
            });
            setactionload(false);
          } else if (response == 1002) {
            setInitialValue({
              ...initialValue,
              errormsg: "Invalid Username or Password!",
            });
            setactionload(false);
          } else if (response == 1003) {
            setInitialValue({
              ...initialValue,
              errormsg: "Subscription id already exist!",
            });
            setactionload(false);
          } else if (response == 1006) {
            setInitialValue({
              ...initialValue,
              errormsg: "Account id doesn't exist!",
            });
            setactionload(false);
          } else if (response == 1004) {
            setInitialValue({
              ...initialValue,
              errormsg: "Invalid Package Id!",
            });
            setactionload(false);
          } else if (response == 1014) {
            setInitialValue({
              ...initialValue,
              errormsg: "Invalid subscription Id!",
            });
            setactionload(false);
          } else {
            setInitialValue({
              ...initialValue,
              errormsg: "Invalid response!",
            });
            setactionload(false);
          }
        })
        .catch((e) => {
          setInitialValue({
            ...initialValue,
            errormsg: "Error downgrade license",
          });
          setactionload(false);
        });
    } else {
      setInitialValue({
        ...initialValue,
        errormsg: "error removing subscription!",
      });
      setactionload(false);
    }
  };

  // deactivate customer account
  const Deactivate = () => {
    if (initialValue.cid !== "") {
      setactionload(true);

      var Api = Connection.api + Connection.deactivate + initialValue.lid;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        remoteid: initialValue.cid,
        localid: initialValue.lid,
        cstatus: 3,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // the action will be taken depending on the server response

          if (response == 0) {
            setConfirm("3");
            setInitialValue({
              ...initialValue,
              cofirmationtxt: `Succeessfully Deactivated!`,
              errormsg: "",
            });
            setactionload(false);
          } else if (response == 1002) {
            setInitialValue({
              ...initialValue,
              errormsg: "Invalid Username or Password!",
            });
            setactionload(false);
          } else if (response == 1006) {
            setInitialValue({
              ...initialValue,
              errormsg: "Account id doesn't exist!",
            });
            setactionload(false);
          } else if (response == 2001) {
            setInitialValue({
              ...initialValue,
              errormsg: "Account is not active!",
            });
            setactionload(false);
          } else {
            setInitialValue({
              ...initialValue,
              errormsg: "Failed to deactivate customer credentials!",
            });
            setactionload(false);
          }
        })
        .catch((e) => {
          setInitialValue({
            ...initialValue,
            errormsg: "Error deactivating customer credentials",
          });
          setactionload(false);
        });
    } else {
      setInitialValue({
        ...initialValue,
        errormsg: "Please enter remote customer id!",
      });
      setactionload(false);
    }
  };

  // deactivate customer account
  const Detach = () => {
    if (initialValue.cid !== "") {
      setactionload(true);
    
            var Api = Connection.api + Connection.detach + initialValue.lid;
            var headers = {
              accept: "application/json",
              "Content-Type": "application/json",
            };

            var Data = {
              remoteid: initialValue.cid,
              localid: initialValue.lid,
              cstatus: 3,
            };

            fetch(Api, {
              method: "PUT",
              headers: headers,
              body: JSON.stringify(Data),
            })
              .then((response) => response.json())
              .then((response) => {
                // the action will be taken depending on the server response

                if (response == 0) {
                  setConfirm("3");
                  setInitialValue({
                    ...initialValue,
                    cofirmationtxt: `Succeessfully Detached!`,
                    errormsg: "",
                  });
                  setactionload(false);
                } 
                else if (response == 1002) {
                  setInitialValue({
                    ...initialValue,
                    errormsg: "Invalid Username or Password!",
                  });
                  setactionload(false);
                } else if (response == 1006) {
                  setInitialValue({
                    ...initialValue,
                    errormsg: "Account id doesn't exist!",
                  });
                  setactionload(false);
                } else if (response == 2002) {
                  setInitialValue({
                    ...initialValue,
                    errormsg: "Account is active!",
                  });
                  setactionload(false);
                } else {
                  setInitialValue({
                    ...initialValue,
                    errormsg: "Invalid response!",
                  });
                  setactionload(false);
                }
              })
              .catch((e) => {
                setInitialValue({
                  ...initialValue,
                  errormsg: "Error detaching user credentials",
                });
                setactionload(false);
              });
          } 
        else {
      setInitialValue({
        ...initialValue,
        errormsg: "Please enter remote customer id!",
      });
      setactionload(false);
    }
  };


  useEffect(() => {
    return () => {};
  }, [initialValue]);

  return (
    <>
     <Header/>
      <Container>
        <Row className="m-auto p-4">
          <Col sm={9} className="bg-white mt-3  m-auto rounded p-4 shadow-sm ">
            <Row className="border rounded m-2">
              <h4 className="mb-2 ps-2 m-2 mt-3 text-uppercase fw-bold">
                Customer Detail
              </h4>
              <Col sm={8} className="mt-2">
                <Row className="">
                  <Col className="ms-4 ps-2  align-items.center justify-content-center">
                    <Row>
                      <span className="primary-text fw-semibold fs-5 mt-1 text-capitalize">
                        {state.first_name +
                          " " +
                          state.middle_name +
                          " " +
                          state.last_name}{" "}
                        {state.status === "1" ? (
                          <span class="badge bg-success bg-opacity-10 text-success px-4 rounded-1">
                            {Status(state.status)}
                          </span>
                        ) : state.status === "2" ? (
                          <span class="badge bg-danger bg-opacity-10 text-danger px-4 rounded-1">
                            {Status(state.status)}
                          </span>
                        ) : state.status === "3" ? (
                          <span class="badge bg-dark bg-opacity-10 text-dark px-4 rounded-1">
                            {Status(state.status)}
                          </span>
                        ) : (
                          <span class="badge bg-secondary bg-opacity-10 text-secondary px-4 rounded-1">
                            {Status(state.status)}
                          </span>
                        )}
                      </span>
                    </Row>
                    <Row>
                      <span className="text-dark mt-0 fw-semibold ">
                        {state.license} device license
                      </span>
                    </Row>
                  </Col>
                </Row>

                <Row className="p-2 ps-1 m-1 mt-4">
                  <Col sm={4} className="alighn-items-start" >
                    
                    <span className="text-dark fw-semibold ">
                      Remote ID:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">{state.remote_id}</span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1 m-1 mt-1">
                  <Col sm={4} className="alighn-items-start">
                  
                    <span className="text-dark  fw-semibold">
                      Local ID:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">{state.id}</span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1 m-1 mt-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-dark  fw-semibold">
                      Email Address:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">{state.email}</span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-dark  fw-semibold">
                      Phone Number:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">{state.phone}</span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-dark  fw-semibold">
                      Living Address:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">
                      {state.living_address}
                    </span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-dark  fw-semibold">
                      Subscription Date:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">
                      {DateSlice(state.created_at)}
                    </span>
                  </Col>
                </Row>
                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-dark fw-semibold">
                      Subscription Plan:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    {state.subscription === "monthly" ? (
                      <span className="text-dark fw-normal">Monthly</span>
                    ) : (
                      <span className="text-dark fw-normal">Annual</span>
                    )}
                  </Col>
                </Row>
                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-dark  fw-semibold">
                      Expire Date:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">
                      {ExpireDate(state.duedate)}
                    </span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-dark  fw-semibold">
                      Payment Method:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-normal">
                      {Payment(state.payment_method)}
                    </span>
                  </Col>
                </Row>
              </Col>

              <Col sm={3}>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "add")}
                  className="btn btn-light text-dark  m-1"
                >
                  Add Subscription
                </Button>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "remove")}
                  className="btn btn-light text-dark  m-1"
                >
                  Remove Subscription
                </Button>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "deactivate")}
                  className="btn btn-light text-dark  m-1"
                >
                  Deactivate Account
                </Button>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "detach")}
                  className="btn btn-light text-dark  m-1"
                >
                  Detach Credentials
                </Button>

                <Link
                  to="/emails"
                  variant="primary"
                  className="btn btn-md btn-light primary-bg text-dark border-0 rounded-1 m-1"
                >
                  Send Email
                </Link>
              </Col>
              <Row className=" d-flex justify-content-start align-items-start ms-0 m-3 mb-2">
                <Col sm={2} className=" align-items-end  ms-1 m-3 mb-2">
                  <Button
                    onClick={goBack}
                    variant="light"
                    className="d-flex btn btn-md btn-light w-100 text-dark fw-semibold text-center justify-content-center mt-2 "
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{initialValue.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirm === "3" ? (
              <div className=" text-center align-items-center justify-content-center h-100  m-auto p-4  mt-3 mb-2">
                <BsCheckCircle size={66} className="text-success m-3" />
                <p>{initialValue.cofirmationtxt}</p>
              </div>
            ) : confirm === "2" ? (
              <div className="p-2 pt-0 pb-3">
                <p className="fw-semibold">{initialValue.cofirmationtxt}</p>
              </div>
            ) : (
              <Form>
                <Row>
                  <Col sm={3} className="align-items-center">
                    <p>Current Plan:</p>
                  </Col>
                  <Col sm={6} className="align-items-center">
                    <p className="primary-text fw-semibold align-items-center">
                      {initialValue.currentPlan} Device License
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col sm={3}>
                    <p>{initialValue.updatedInfo}:</p>
                  </Col>
                  <Col sm={8} className="justify-content-start">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        title="1 License"
                        id="dropdown-basic"
                      >
                        {license} License
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="light">
                        <Dropdown.Item onClick={() => setLicense(5)}>
                          5 License
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setLicense(10)}>
                          10 License
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setLicense(15)}>
                          15 License
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
               
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
          <div className="position-relative  ms-0 rounded  px-2 ps-0 text-start">
              <p className="text-danger text-center pt-2">
                {initialValue.errormsg}
              </p>
            </div>
            <Button variant="light" onClick={handleClose}>
              Back
            </Button>
            {initialValue.operation === "add" ? (
              <Button
                variant="light"
                className="primary-bg border-0"
                onClick={() => AddSubscription()}
              >
                {actionload ? (
                  <div
                    class="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                  </div>
                ) : (
                  <span>Confirm</span>
                )}
              </Button>
            ) : initialValue.operation === "remove" ? (
              <Button
                variant="light"
                className="primary-bg border-0"
                onClick={() => RemoveSubscription()}
              >
                 {actionload ? (
                  <div
                    class="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                  </div>
                ) : (
                  <span>Confirm</span>
                )}
              </Button>
            ) : initialValue.operation === "deactivate" ? (
              <Button variant="danger" onClick={() => Deactivate()}>
                 {actionload ? (
                  <div
                    class="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                  </div>
                ) : (
                  <span>Deactivate</span>
                )}
              </Button>
            ) : initialValue.operation === "detach" ? (
              <Button variant="danger" onClick={() => Detach()}>
                 {actionload ? (
                  <div
                    class="spinner-border spinner-border-sm text-secondary"
                    role="status"
                  >
                  </div>
                ) : (
                  <span>Detach</span>
                )}
              </Button>
            ) : null}
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default CustomerDetail;
