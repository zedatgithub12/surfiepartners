import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaWallet } from "react-icons/fa";
import { IoIosPeople, IoIosCopy } from "react-icons/io";
import Withdrwals from "../data/withdrawals";
import ListItemButton from "@mui/material/ListItemButton";
import { FiChevronRight } from "react-icons/fi";
import customers from "../data/customers";
import IconButton from "@mui/material/IconButton";
import Header from "../components/header";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import { GrFormClose } from "react-icons/gr";

function Home() {

    const navigate = useNavigate();
  const [paging, setPaging] = useState([]);
  const [withmodal, setWithModal] = useState(false);
  const [pmodal, setPModal] = useState("Telebirr");
  const [withdrawal, setWithdrawal] = useState({
    amount: "",
    amountbc: false,
    amountht: "",

    account: "",
    accountbc: false,
    accountht: "",
  });

  const updateAmount =(event)=>{
    setWithdrawal({
        ...withdrawal,
        amount: event.target.value,
        amountbc: false,
        amountht: "",
    })
  };
  const updateAccount =(event)=>{
    setWithdrawal({
        ...withdrawal,
        account: event.target.value,
        accountbc: false,
        accountht: "",
    })
  };

  const ConfirmPayout =()=>{
  if(withdrawal.amount === ""){
    setWithdrawal({
        ...withdrawal,
   
        amountbc: true,
        amountht: "Please Enter Amount",
    });
    document.getElementById('amount').focus();
  }
  else if(withdrawal.account === ""){
    setWithdrawal({
        ...withdrawal,
      
        accountbc: true,
        accountht: "Please Enter Account Number ",
    });
    document.getElementById('account').focus();
  }
  else {
      alert("all is well");
  }
  }
  return (
    <>
      <Header />
      <Container>
        <Row className="pt-4 ps-0">
          <Col
            sm={3}
            className="p-3 m-4  bg-light rounded-3 text-center shadow-sm  "
          >
            <p className="fs-1 fw-semibold money-color ">
              2445<sup>ETB</sup>
            </p>
            <div className="d-flex justify-content-center align-items-center mt-4 ">
              <FaWallet size={28} className="money-color" />{" "}
              <p className="fw-semibold fs-5 mt-2 ms-3">Current Balance</p>
            </div>
          </Col>

          <Col
            sm={3}
            className="p-3 m-4 bg-light rounded-3 text-center shadow-sm"
          >
            <p className="fs-1 fw-semibold text-primary">108</p>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <IoIosPeople size={32} className="text-primary" />
              <p className="fw-semibold fs-5 mt-2 ms-3">Referred Customers</p>
            </div>
          </Col>

          <Col sm={3} className=" m-4 ">
            <div className="d-flex justify-content-between align-items-center p-3  mt-0 bg-light rounded-3 shadow-sm text-muted fw-semibold">
              <div>
                <small>Referral code</small> <br />
                <span className="fs-4 fw-semibold text-dark">DFCTYN12</span>
              </div>
              <IconButton aria-label="delete">
                <IoIosCopy size={30} />
              </IconButton>
            </div>
            <NavLink
              to="/account"
              className="btn btn-primary form-control mt-3"
            >
              Create Account
            </NavLink>
            <br />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col sm={9}>
            <div className="d-flex justify-content-between ">
              <p className="text-muted fw-semibold fs-5 ms-4 ps-2">
                Withdrawals
              </p>
              <NavLink
                onClick={() => setWithModal(true)}
                className="money-color my-auto fw-semibold"
              >
                Request Withdrawal
              </NavLink>
            </div>
            {Withdrwals.map((item, index) => (
              <ListItemButton
                key={index}
                className="d-flex justify-content-between align-items-center ms-4 ps-4 bg-light my-1 px-2 rounded py-2"
              >
                <p className="fw-semibold text-muted  my-auto">{item.date}</p>
                <div className="d-flex justify-content-center align-items-center ">
                  <p className="fw-semibold my-auto me-2">{item.amount} ETB </p>{" "}
                  <FiChevronRight
                    size={20}
                    className="money-color  my-auto mt-1"
                  />
                </div>
              </ListItemButton>
            ))}

            <NavLink to="./withdrawals" className=" ms-4 ps-2">See more</NavLink>
          </Col>
        </Row>

        <Row>
          <Col sm={9}>
            <p className="text-muted fw-semibold fs-5 ms-3 ps-3 mt-4">
              Referred Customers
            </p>
            <table className="table ms-4 ps-2 table-hover">
              <thead className="bg-light  p-2">
                <tr>
                  <th scope="col" className="rounded text-muted fw-semibold ">
                    Name
                  </th>
                  <th
                    scope="col"
                    className="rounded text-muted fw-semibold border-start"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="rounded text-muted fw-semibold border-start"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="rounded text-muted fw-semibold border-start"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item, index) => (
                  <tr key={index} onClick={()=> navigate("./customerdetails")}>
                    <td>
                      {item.fname} {item.mname}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        </Row>

        {withmodal ? (
          <div className="position-fixed end-0 bottom-0 bg-secondary bg-opacity-10 shadow rounded m-2 me-3 p-3 w-25 mb-5">
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
            <small class="form-text  text-danger ms-3">
              {withdrawal.amountht}
            </small>
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
              className="btn btn-primary mt-4 form-control  w-75 ms-3 mb-3"
              onClick={() => ConfirmPayout()}
            >
              Confirm
            </button>{" "}
            <br />
            <p class="form-text  text-muted mx-3 mt-1  px-4 caption">
              Your user Information will be used to process the payment
              Make sure you have provided account information of yourself
            </p>
          </div>
        ) : null}
      </Container>

      <Container fluid className="text-center ">
        <p className="text-muted small">
          2023 © All right reserved by Afromina Digitals
        </p>
      </Container>
    </>
  );
}

export default Home;
