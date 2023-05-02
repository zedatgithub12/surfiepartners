import { useState, useMemo, useEffect } from "react";

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
  const [loged, setLoged] = useState(false);
  const [user, setUser] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    phone: "",
    organization: "",
    referralcode: "",
    balance: "0",
    noreferral: "0",
    status: "",
  });

  const authContext = useMemo(
    () => ({
      user,

      SignIn: async (status, users) => {
        if (status === "Signed") {
          sessionStorage.setItem("user", JSON.stringify(users));
          sessionStorage.setItem("token", JSON.stringify(users.fname));
          sessionStorage.setItem("balance", JSON.stringify(users.balance));
          sessionStorage.setItem("referrels", JSON.stringify(users.noreferral));
          setLoged(true);
        } else {
          setLoged(false);
        }
      },

      SignOut: async (status) => {
        if (status === "Signout") {
          sessionStorage.clear();

          setLoged(false);
        }
        {
          setLoged(false);
        }
      },

      getToken: async () => {
        const tokenString = sessionStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return userToken;
      },

      getUser: async () => {
        const userString = sessionStorage.getItem("user");
        const userDetails = JSON.parse(userString);
        return userDetails;
      },
    }),
    []
  );

  useEffect(() => {
    var tokens = sessionStorage.getItem("token");

    if (tokens !== null) {
      setLoged(true);
    }
    return () => {};
  }, [loged]);
  return (
    <>
      <AuthContext.Provider value={authContext}>
        <Router>
          {loged ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Auth" element={<Auth />} />
              <Route path="/account" element={<CreateAccount />} />
              <Route path="/customerdetail" element={<CustomerDetail />} />
              <Route path="/profile" element={<Profiledetail />} />
              <Route path="/withdrawals" element={<Withdrawals />} />
              <Route path="/forgotpass" element={<Forgotpass />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/Auth" element={<Auth />} />
              <Route path="/forgotpass" element={<Forgotpass />} />
            </Routes>
          )}
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
