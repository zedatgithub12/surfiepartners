import React from "react";
import Header from "../components/header";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { FiChevronRight } from "react-icons/fi";
import Withdrwals from "../data/withdrawals";
import ReactPaginate from "react-paginate";
import { BsArrowBarLeft } from "react-icons/bs";


function Withdrawals() {
  const navigate = useNavigate();
  const Goback = () => {
    navigate(-1);
  };
  const [paging, setPaging] = React.useState([]);
  const [detail, setDetail] = React.useState([]);

  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5 shadow bg-whiten py-3 rounded px-3 pt-4">
      
          <Col sm={8}>
            <div className="d-flex justify-content-between ">
              <p className="text-muted fw-semibold fs-5 ms-4 ps-2">
                Withdrawals
              </p>
            </div>
            {Withdrwals.map((item, index) => (
              <ListItemButton
                key={index}
                className="d-flex justify-content-between align-items-center ms-4 ps-4 bg-light my-1 px-2 rounded py-2"
                onClick={() => setDetail(item)}
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
          <Col sm={4} className="bg-light rounded mt-5 pt-2 p-4 ">
            <p className="fw-semibold fs-6">Payment Details</p>
            <div className="d-flex justify-content-between align-items-center ">
              <p className="">Requested Date</p>{" "}
              <p className="fw-semibold text-muted">{detail.date}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Amount</p>{" "}
              <p className="fw-semibold text-muted">{detail.amount}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Payment Channel</p>{" "}
              <p className="fw-semibold text-muted">{detail.channel}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Account Number</p>{" "}
              <p className="fw-semibold text-muted">{detail.accountNo}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center ">
              <p>Proccessed Date</p>{" "}
              <p className="fw-semibold text-muted">{detail.pdate}</p>
            </div>
            
          </Col>
        <Row>
          <Col>
           <NavLink
            onClick={Goback}
            className="text-secondary border rounded px-3 py-1 fw-semibold ms-2 mb-3 my-3  float-end"
          >
           <BsArrowBarLeft size={18}/> Back
          </NavLink>
          </Col>
         </Row>
        </Row>
        
      </Container>
    </>
  );
}

export default Withdrawals;
