import { useState } from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profiledetail from './pages/Profiledetail';
import Withdrawals from './pages/Withdrawals';
import Auth from './pages/Auth';
import Forgotpass from './pages/Forgotpass';
import CreateAccount from './pages/CreateAccount';
import CustomerDetail from './pages/CustomerDetail';

function App() {

  return (
    <>
    <Router>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<CreateAccount />} />
            <Route path="/customerdetails" element={<CustomerDetail />} />
            <Route path="/profile" element={<Profiledetail />} />
            <Route path="/withdrawals" element={<Withdrawals />} />
            <Route path="/forgotpass" element={<Forgotpass />} />
          </Routes>
  
      </Router>
    </>
  )
}

export default App
