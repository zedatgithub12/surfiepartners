import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaWallet } from "react-icons/fa";
import { IoIosPeople, IoIosCopy, IoMdClose } from "react-icons/io";
import Withdrwals from "../data/withdrawals";
import ListItemButton from "@mui/material/ListItemButton";
import { FiChevronRight } from "react-icons/fi";
import IconButton from "@mui/material/IconButton";
import Header from "../components/header";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import { GrFormClose } from "react-icons/gr";
import Snackbar from "@mui/material/Snackbar";
import Connection from "../constants/Connections";
import HomeSkeleton from "../ui-component/HomeSkeleton";

function Home() {
  const navigate = useNavigate();

  const balance = sessionStorage.getItem("balance");
  const yourbalance = JSON.parse(balance);

  const referral = sessionStorage.getItem("referrels");
  const yourreferral = JSON.parse(referral);

  const userinfo = sessionStorage.getItem("user");
  const user = JSON.parse(userinfo);
  const [paging, setPaging] = useState([]);
  const [withmodal, setWithModal] = useState(false);
  const [pmodal, setPModal] = useState("Telebirr");
  const [open, setOpen] = React.useState(false);
  const [pdetail, setPdetail] = useState(false);
  const [detail, setDetail] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [withdraws, setWithdraws] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cards, setCards] = useState({
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
    } else if (withdrawal.amount > user.balance) {
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
            console.log(response);
          } else {
            setWithLoading(false);
            console.log("can not request withdrawal for now retry later");
          }
        })
        .catch((e) => {
          setWithLoading(false);
          console.log(e);
        });
    }
  };

  useEffect(() => {
    const getCustomers = async (currentPage) => {
      setLoading(false);
      var Api =
        Connection.api +
        Connection.customers +
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
          setLoading(true);
        })
        .catch((e) => {
          setLoading(true);
        });
    };
    const getWithdrawals = () => {
      setLoading(true);
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
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    };
    getCustomers();
    getWithdrawals();
    return () => {};
  }, []);
  return (
    <>
      <Header />
      {loading ? (
        <div
          className="spinner-border spinner-border-lg primary-text m-auto d-flex align-items-center justify-content-center mt-5"
          role="status"
        >
          <span className="visually-hidden m-auto">Loading...</span>
        </div>
      ) : (
        <>
          <Container>
            <Row className="px-4 mb-1 mt-4 pt-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center p-3 border mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <small>Current Balance</small> <br />
                    <span className="fs-4 fw-semibold text-dark money-color">
                      {cards.balance} <sup>ETB</sup>
                    </span>
                  </div>
                  <FaWallet size={28} className="money-color" />
                </div>
              </Col>

              <Col>
                <div className="d-flex justify-content-between align-items-center p-3 border mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <small>Referred Customers</small> <br />
                    <span className="fs-4 fw-semibold text-dark">
                      {cards.noreferrals}
                    </span>
                  </div>
                  <IoIosPeople size={32} className="primary-text" />
                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center p-3 border  mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
                  <div>
                    <small>Referral code</small> <br />
                    <span className="fs-4 fw-semibold text-dark">
                      {cards.referralcode}
                    </span>
                  </div>
                  <IconButton
                    aria-label="delete"
                    onClick={() => copyToClipboard(cards.referralcode)}
                  >
                    <IoIosCopy size={30} />
                  </IconButton>
                </div>
              </Col>
            </Row>

            <Row className="mt-3 mb-3 pb-3">
              <Col sm={8}>
                {withdraws.length > 0 ? (
                  <>
                    <div className="d-flex justify-content-between ">
                      <p className="text-muted fw-semibold fs-5 ms-4 ps-2">
                        Withdrawals
                      </p>
                      <NavLink
                        onClick={() => setWithModal(!withmodal)}
                        className="money-color my-auto fw-semibold"
                      >
                        Request Withdrawal
                      </NavLink>
                    </div>
                    {Withdrawals.map((item, index) => (
                      <ListItemButton
                        key={index}
                        className="d-flex justify-content-between align-items-center ms-4 ps-4 bg-light my-1 px-2 rounded py-2"
                        onClick={() => WithDetail(item)}
                      >
                        <p className="fw-semibold text-muted  my-auto">
                          {item.issueddate}
                        </p>
                        <div className="d-flex justify-content-center align-items-center ">
                          <p className="fw-semibold my-auto me-2">
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

                {withdraws.length > 3 ? (
                  <NavLink to="/withdrawals" className=" ms-4 ps-2" id="link">
                    See more
                  </NavLink>
                ) : null}
                <div className="shadow-sm position-relative rounded">
                  <p className="text-muted fw-semibold fs-5 ms-3 ps-1 mt-4">
                    Referred Customers
                  </p>
                  <table className="table  px-3 table-hover">
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
                            {item.status === "1" ? (
                              <span class="bg-success  bg-opacity-10 text-success pe-1 px-2 rounded-1">
                                {Status(item.status)}
                              </span>
                            ) : item.status === "2" ? (
                              <span class="badge bg-danger bg-opacity-10 text-danger pe-1 rounded-1">
                                {Status(item.status)}
                              </span>
                            ) : item.status === "3" ? (
                              <span class="badge bg-dark bg-opacity-10 text-dark pe-1 rounded-1">
                                {Status(item.status)}
                              </span>
                            ) : (
                              <span class="badge bg-secondary bg-opacity-10 text-secondary pe-1 rounded-1">
                                {Status(item.status)}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
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
                {Withdrwals.length == 0 ? (
                  <NavLink
                    onClick={() => setWithModal(!withmodal)}
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
                      <p className="fw-semibold text-muted">{detail.date}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <p>Amount</p>
                      <p className="fw-semibold text-muted">{detail.amount}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <p>Payment Channel</p>
                      <p className="fw-semibold text-muted">{detail.channel}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <p>Account Number</p>
                      <p className="fw-semibold text-muted">
                        {detail.accountNo}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <p>Proccessed Date</p>
                      <p className="fw-semibold text-muted">{detail.pdate}</p>
                    </div>
                  </div>
                ) : null}

                {withmodal ? (
                  <div className=" shadow-sm border rounded  p-3  mb-5">
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
                      className="btn  mt-4 form-control  w-75 ms-3 mb-3"
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
                    <p class="form-text  text-muted mx-3 mt-1  px-4 caption">
                      Your user Information will be used to process the payment
                      Make sure you have provided account information of
                      yourself
                    </p>
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

          <Container fluid className="text-center ">
            <p className="text-muted small">
              2023 © All right reserved by Afromina Digitals
            </p>
          </Container>
        </>
      )}
    </>
  );
}

export default Home;
