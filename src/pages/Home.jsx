import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import noreferre from "../assets/referre.svg";
import { FaWallet } from "react-icons/fa";
import { IoIosPeople, IoIosCopy, IoMdClose } from "react-icons/io";
import ListItemButton from "@mui/material/ListItemButton";
import { FiChevronRight } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import Header from "../components/header";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import { GrFormClose } from "react-icons/gr";
import Snackbar from "@mui/material/Snackbar";
import Connection from "../constants/Connections";
import Footer from "../components/footer";
import { Typography } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const balance = sessionStorage.getItem("balance");
  const yourbalance = JSON.parse(balance);
  const referral = sessionStorage.getItem("referrels");
  const yourreferral = JSON.parse(referral);
  const monthlyref = sessionStorage.getItem("monthly");
  const monthlycount = JSON.parse(monthlyref);
  const [monthly] = useState(monthlycount);
  const userinfo = sessionStorage.getItem("user");
  const user = JSON.parse(userinfo);
  const [paging, setPaging] = useState([]);
  const [withmodal, setWithModal] = useState(false);
  const [pmodal, setPModal] = useState("Telebirr");
  const [open, setOpen] = React.useState(false);
  const [pdetail, setPdetail] = useState(false);
  const [detail, setDetail] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [withdraws, setWithdraws] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cards] = useState({
    balance: yourbalance,
    noreferrals: yourreferral,
    referralcode: user.referralcode,
  });
  const [withloading, setWithLoading] = useState(false);
  const [withdrawal, setWithdrawal] = useState({
    amount: "",
    amountbc: false,
    amountht: "",

    account: "",
    accountbc: false,
    accountht: "",

    status: false,
    reshelper: "",
  });

  const Withdrawals = withdraws ? withdraws.slice(0, 3) : [];

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const updateAmount = (event) => {
    setWithdrawal({
      ...withdrawal,
      amount: event.target.value,
      amountbc: false,
      amountht: "",
    });
  };
  const updateAccount = (event) => {
    setWithdrawal({
      ...withdrawal,
      account: event.target.value,
      accountbc: false,
      accountht: "",
    });
  };

  const DateSlice = (date) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    return day + "/" + month + "/" + year;
  };
  const WithDetail = (item) => {
    setDetail(item);
    setPdetail(true);
  };
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => handleClick())
      .catch((err) => console.error("Could not copy text: ", err));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoMdClose fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const ConfirmPayout = () => {
    if (withdrawal.amount === "") {
      setWithdrawal({
        ...withdrawal,
        amountbc: true,
        amountht: "Please Enter Amount",
      });
      document.getElementById("amount").focus();
    } else if (user.balance < 50) {
      setWithdrawal({
        ...withdrawal,
        amountht:
          "To request withdrawal your balance must be greater than 50 ETB!",
      });
      document.getElementById("amount").focus();
    } else if (withdrawal.amount > cards.balance) {
      setWithdrawal({
        ...withdrawal,
        amountbc: true,
        amountht: "You have insufficient balance!",
      });
      document.getElementById("amount").focus();
    } else if (withdrawal.account === "") {
      setWithdrawal({
        ...withdrawal,

        accountbc: true,
        accountht: "Please Enter Account Number ",
      });
      document.getElementById("account").focus();
    } else {
      setWithLoading(true);
      var Api = Connection.api + Connection.requestWithdrawal;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      var Data = {
        partnerid: user.id,
        amount: withdrawal.amount,
        channel: pmodal,
        accountno: withdrawal.account,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response === "succeed") {
            setWithLoading(false);
            setWithdrawal({
              ...withdrawal,
              status: true,
              reshelper: "Successfully Requested",
            });
          } else {
            setWithLoading(false);
          }
        })
        .catch((e) => {
          setWithLoading(false);
        });
    }
  };

// eslint-disable-next-line
useEffect(() => {
    //get referred customer list
    const getCustomers = async (currentPage) => {
      setLoading(true);
      var Api =
        Connection.api +
        Connection.referred +
        user.referralcode +
        `?page=${currentPage}`;

      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      fetch(Api, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((response) => {
          setCustomers(response.data);
          setPaging(response);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    };

    //fetch list of withdrawals
    const getWithdrawals = () => {
      var Api = Connection.api + Connection.withdrawals + user.id;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      fetch(Api, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((response) => {
          setWithdraws(response);
        })
        .catch((e) => {});
    };
    const getCardData = () => {
      var Api = Connection.api + Connection.carddata + user.id;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      var Data = {
        referral: cards.referralcode,
      };
      fetch(Api, {
        method: "GET",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          sessionStorage.setItem("balance", JSON.stringify(response.balance));
          sessionStorage.setItem("monthly", JSON.stringify(response.monthly));
          sessionStorage.setItem("referrels", JSON.stringify(response.total));
        })
        .catch(() => {});
    };

    getCustomers();
    getWithdrawals();
    getCardData();

    return () => {};
  }, []);
  return (
    <>
      <Header />

      <Container className="bg-white shadow-sm">
        <Row className="px-4 mb-1 mt-4 pt-4 ">
          <Col>
            <div className="d-flex justify-content-between align-items-center p-3 border mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
              <div>
                <span className="fs-4 fw-semibold text-dark">
                  <span className="fs-4 fw-normal text-muted"> ETB </span>
                  {cards.balance}
                </span>
                <br />
                <Typography>Current Balance</Typography>
              </div>
              <FaWallet size={28} className="money-color" />
            </div>
          </Col>

          <Col>
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
                <Typography>Referred Customers</Typography>
              </div>
              <IoIosPeople size={32} className="primary-text" />
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-between align-items-center p-3 border  mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
              <div>
                <span className="fs-4 fw-semibold text-dark">
                  {cards.referralcode}
                </span>
                <br />
                <Typography>Referral code</Typography>
              </div>
              <IconButton
                aria-label="delete"
                onClick={() => copyToClipboard(cards.referralcode)}
              >
                <IoIosCopy size={28} />
              </IconButton>
            </div>
          </Col>
        </Row>

        <Row className="mt-3 mb-3 pb-3">
          <Col sm={8}>
            {withdraws.length > 0 ? (
              <>
                <div className="d-flex justify-content-between mt-3 ">
                  <p className="fw-normal fs-6 ms-3 ps-2">Last Withdrawals</p>
                  <NavLink
                    onClick={() => setWithModal(!withmodal)}
                    id="links"
                    className="money-color fs-6 my-auto fw-normal  me-1 px-2"
                  >
                    Request Withdrawal
                  </NavLink>
                </div>
                {Withdrawals.map((item, index) => (
                  <ListItemButton
                    key={index}
                    className="d-flex justify-content-between align-items-center ms-3 me-2 px-3 bg-light my-1 rounded py-2"
                    onClick={() => WithDetail(item)}
                  >
                    <p className="fw-normal text-muted  my-auto">
                      {item.issueddate}
                    </p>
                    <div className="d-flex justify-content-center align-items-center ">
                      <p className="fw-normal my-auto me-2">
                        {item.amount} ETB
                      </p>
                      <FiChevronRight
                        size={20}
                        className="money-color  my-auto mt-1"
                      />
                    </div>
                  </ListItemButton>
                ))}
              </>
            ) : null}

            <div
              className={
                loading
                  ? " position-relative rounded"
                  : " position-relative rounded"
              }
            >
              <p className=" fw-normal fs-6 ms-1 ms-3 pt-2 ps-2 mt-4">
                Referred Customers
              </p>
              <table className="table  px-3 table-hover">
                {customers.length > 0 ? (
                  loading ? (
                    <div className="my-5 d-flex align-items-center justify-content-center w-100">
                      <div
                        className="spinner-border spinner-border-lg primary-text m-auto d-flex align-items-center justify-content-center "
                        role="status"
                      >
                        <span className="visually-hidden m-auto">
                          Loading...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <thead className="bg-light">
                        <tr>
                          <th className="rounded text-muted fw-semibold ">
                            Name
                          </th>
                          <th className="rounded text-muted fw-semibold border-start">
                            Email
                          </th>
                          <th className="rounded text-muted fw-semibold border-start">
                            Phone
                          </th>
                          <th className="rounded text-muted fw-semibold border-start">
                            Date
                          </th>
                          <th className="rounded text-muted fw-semibold border-start">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((item, index) => (
                          <tr
                            key={index}
                            onClick={() =>
                              navigate("/customerdetail", {
                                state: { ...item },
                              })
                            }
                          >
                            <td>
                              {item.first_name} {item.middle_name}
                            </td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{DateSlice(item.created_at)}</td>
                            <td>
                              {item.status === 1 ? (
                                <span className="bg-success  bg-opacity-10 text-success pe-1 px-2 rounded-1">
                                  Active
                                </span>
                              ) : item.status === 2 ? (
                                <span className="badge bg-danger bg-opacity-10 text-danger pe-1 px-2 rounded-1">
                                  Expired
                                </span>
                              ) : item.status === 3 ? (
                                <span className="badge bg-dark bg-opacity-10 text-dark pe-1 px-2 rounded-1">
                                  Terminated
                                </span>
                              ) : (
                                <span className="badge bg-secondary bg-opacity-10 text-secondary pe-1 px-2 rounded-1">
                                  Pending
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  )
                ) : (
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="text-center my-3 p-4">
                      <img
                        src={noreferre}
                        className="img-fluid w-50 h-50 "
                        alt="no referre"
                      />
                      <p className="fs-6 fw-semibold text-muted ">
                        No referred customer yet!
                      </p>
                    </div>
                  </div>
                )}
              </table>
            </div>
            {/* the withdrawal record mapping made here */}

            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={Math.ceil(paging.last_page)}
              marginPagesDisplayed={3}
              pageRangeDisplayed={3}
              // onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-end"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </Col>

          <Col sm={4}>
            <NavLink
              to="/account"
              className="btn px-5 mt-3 mb-2"
              id="primarybtn"
            >
              Add Customer
            </NavLink>
            <br />
            {Withdrawals.length < 3 ? (
              <NavLink
                onClick={() => setWithModal(!withmodal)}
                id="links"
                className="money-color my-auto fw-semibold mt-2 pt-2"
              >
                Request Withdrawal
              </NavLink>
            ) : null}

            {pdetail ? (
              <div className="bg-white shadow-sm rounded p-3 my-3 border">
                <p className="fw-semibold fs-6">Payment Details</p>
                <div className="d-flex justify-content-between align-items-center ">
                  <p className="">Requested Date</p>
                  <p className="fw-semibold text-muted">{detail.issueddate}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <p>Amount</p>
                  <p className="fw-semibold text-muted">{detail.amount} Birr</p>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <p>Payment Channel</p>
                  <p className="fw-semibold text-muted">{detail.channel}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <p>Account Number</p>
                  <p className="fw-semibold text-muted">{detail.accountno}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <p>Proccessed Date</p>
                  <p className="fw-semibold text-muted">
                    {detail.proccessed ? detail.proccessed : "Pending"}
                  </p>
                </div>
              </div>
            ) : null}

            {withmodal ? (
              <div className=" align-items-center justify-content-center shadow-sm border rounded  p-3  mb-5">
                <button
                  onClick={() => setWithModal(false)}
                  className="bg-light bg-opacity-25 fw-bold p-3 py-1 rounded float-end position-absolute top-0 end-0 m-2"
                >
                  <GrFormClose size={26} className="text-danger" />
                </button>
                <p className="fw-semibold fs-5 mt-1 ms-3 mb-4 text-muted ">
                  Withdrawal Information
                </p>
                <input
                  type="text"
                  id="amount"
                  className={
                    withdrawal.amountbc
                      ? "form-control mt-4 border-danger w-75 ms-3"
                      : "form-control mt-4 w-75 ms-3"
                  }
                  placeholder="Amount"
                  aria-label="Amount"
                  value={withdrawal.amount}
                  onChange={updateAmount}
                />
                <div className="ms-3 w-75">
                  <span class="form-text small text-danger  text-center ">
                    {withdrawal.amountht}
                  </span>
                </div>

                <Dropdown className="m-3 ms-0  w-75 ms-3">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    {pmodal}
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="light">
                    <Dropdown.Item onClick={() => setPModal("Telebirr")} active>
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
                <input
                  type="text"
                  id="account"
                  className={
                    withdrawal.amountbc
                      ? "form-control mt-3 border-danger  w-75 ms-3"
                      : "form-control mt-3  w-75 ms-3"
                  }
                  placeholder="Account No"
                  aria-label="Account No"
                  value={withdrawal.account}
                  onChange={updateAccount}
                />
                <small class="form-text  text-danger ps-3 ">
                  {withdrawal.accountht}
                </small>
                <button
                  type="button"
                  disabled={withloading ? true : false}
                  id="primarybtn"
                  className="btn  mt-4 form-control  w-75  mb-3"
                  onClick={() => ConfirmPayout()}
                >
                  {withloading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light "
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </button>
                <br />

                <p class="form-text  text-muted  mt-1  px-4 caption">
                  Your user Information will be used to process the payment Make
                  sure you have provided account information of yourself
                </p>

                {withdrawal.status ? (
                  <Typography class="form-text small text-success bg-success bg-opacity-10 rounded mx-3 ms-4 w-75 p-2 px-4 text-center ">
                    {withdrawal.reshelper}
                  </Typography>
                ) : null}
              </div>
            ) : null}
          </Col>
        </Row>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Copied to Clipboard!"
          action={action}
        />
      </Container>

      <Footer />
    </>
  );
}

export default Home;
