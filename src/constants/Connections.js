const Connection = {
  url: "http://localhost:3000",
  api: "http://localhost:8000/api",
  // api: "https://admin.surfieethiopia.com/backend/api",
  remote: "https://surfie.puresight.com/cgi-bin/ProvisionAPI/",
  register: "/pregister",
  login: "/partnerlogin",
  customers: "/referred/",

  chapaResponse: "/chapa", //payment gateways
  requestWithdrawal: "/withdraw",
  withdrawals: "/withdrawals/",
  updateprofile: "/update/",
  changepassword: "/changepass/",
};

export default Connection;
