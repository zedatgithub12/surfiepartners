import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import Dropdown from "react-bootstrap/Dropdown";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Context";

function Header() {
  const navigate = useNavigate();
  const { SignOut } = React.useContext(AuthContext);

  const userinfo = sessionStorage.getItem("user");
  const user = JSON.parse(userinfo);

  const LogOut = (status) => {
    SignOut(status);
    navigate("/");
  };
  const firstLetter = user.fname.charAt(0);
  return (
    <Container fluid className="primary-bg  sticky-top  ">
      <Row className="d-flex justify-content-between p-1 pt-2">
        <Col sm={8} className="ms-5 my-auto d-flex">
          <img src={Logo} alt="logo" width="90" height="50" />

          {user.organization ? (
            <p className="my-auto fs-2 fw-semibold border-start border-3 border-light ms-3 ps-2 text-capitalize text-white">
              {user.organization}
            </p>
          ) : null}
        </Col>
        <Col sm={2}>
          <div className="float-end d-flex justify-content-between align-items-center me-3">
            <NavLink
              to="/profile"
              className="me-2 text-white fw-semibold text-capitalize p-2"
            >
              {user.fname} {user.mname}{" "}
            </NavLink>

            <Dropdown className="text-center">
              <Dropdown.Toggle
                variant="white"
                title="Profile"
                id="dropdown-basic"
                className="border-0 primary-bg  text-white fw-medium font-link rounded-circle text-center"
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  className="p-2 bg-white border-dark text-muted"
                >
                  {user.fname ? firstLetter : "U"}
                </Avatar>
              </Dropdown.Toggle>

              <Dropdown.Menu variant="light" className="">
                <Row className="p-3 pt-0 pb-0">
                  <NavLink
                    to="/profile"
                    className="fw-semibold fs-6 primary-text"
                  >
                    {user.fname} {user.mname}
                  </NavLink>

                  <span>{user.email}</span>
                </Row>
                <hr />

                <Dropdown.Item
                  onClick={() => LogOut("Signout")}
                  className="text-muted"
                >
                  <FaArrowLeft size={16} color="#888" className="me-2" />
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
