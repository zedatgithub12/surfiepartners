const Connection = {
  url: "http://localhost:3000",
  // api: "http://localhost:8000/api",
  api: "https://admin.surfieethiopia.com/backend/api",
  remote: "https://surfie.puresight.com/cgi-bin/ProvisionAPI/",
  register: "/pregister",
  login: "/partnerlogin",
  customers: "/customers",

  chapaResponse: "/chapa", //payment gateways
  referred: "/referred/",
  renew: "/renewal/",
  requestWithdrawal: "/withdraw",
  withdrawals: "/withdrawals/",
  updateprofile: "/update/",
  changepassword: "/changepass/",
  carddata: "/referrals/",
  forgot: "/forgotpassword",
  reset: "/resetpassword",
};

export default Connection;
