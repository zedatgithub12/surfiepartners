import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/logo.png";
import Avatar from '@mui/material/Avatar';
import Dropdown from "react-bootstrap/Dropdown";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Context';


function Header() {
  const navigate = useNavigate();
  const {user} = React.useContext(AuthContext);

        return (
            <Container fluid className="primary-bg  sticky-top  ">
        <Row className='d-flex justify-content-between p-1 pt-2'>
          <Col sm={2} className="ms-5 my-auto">
            <img src={Logo} alt="logo" width="90" height="50" />
          </Col>
          <Col sm={2} >
            <div className='float-end d-flex justify-content-between align-items-center me-3'>
              <NavLink to="/profile" className='me-2 text-white fw-semibold'>{user.fname} {user.mname} </NavLink>
          

            <Dropdown className="text-center">
              <Dropdown.Toggle
                variant="white"
                title="Profile"
                id="dropdown-basic"
                className="border-0 primary-bg  text-white fw-medium font-link rounded-circle text-center"
              >
                 <Avatar sx={{ width: 32, height: 32 }}>H</Avatar>
              </Dropdown.Toggle>

              <Dropdown.Menu variant="light" className=''>
                <Row className="p-3 pt-0 pb-0">
                  <NavLink to="/profile" className="fw-semibold fs-6 primary-text">{user.fname} {user.mname}</NavLink>
               
                  <span>{user.email}</span>
                </Row>
                <hr />
              
                <Dropdown.Item
                  onClick={() =>navigate('/')}
                  className="text-muted"
                >
                  <FaArrowLeft size={16} color="#888" className='me-2' />Log Out
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