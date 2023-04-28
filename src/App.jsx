import { useState, useMemo } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profiledetail from "./pages/Profiledetail";
import Withdrawals from "./pages/Withdrawals";
import Auth from "./pages/Auth";
import Forgotpass from "./pages/Forgotpass";
import CreateAccount from "./pages/CreateAccount";
import CustomerDetail from "./pages/CustomerDetail";
import { AuthContext } from "./context/Context";

function App() {


  const [user, setUser] = useState({
    fname: '',
    mname:'',
    lname:'',
    email: '',
    phone: '',
    organization:'',
    referralcode: '',
    balance:'0',
    noreferral:'0',
    status: '',

    logged: false,
  });

  const updateUser = (newUserInfo) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserInfo }));
  };
 
  return (
    <>
      <AuthContext.Provider value={{user, updateUser}}>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<CreateAccount />} />
            <Route path="/customerdetails" element={<CustomerDetail />} />
            <Route path="/profile" element={<Profiledetail />} />
            <Route path="/withdrawals" element={<Withdrawals />} />
            <Route path="/forgotpass" element={<Forgotpass />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
