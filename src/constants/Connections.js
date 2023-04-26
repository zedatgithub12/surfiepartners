const Connection = {
    url: "http://localhost:3000",
    //  api: "http://localhost:8000/api",
    api: "https://admin.surfieethiopia.com/backend/api",
    remote: "https://surfie.puresight.com/cgi-bin/ProvisionAPI/",
    login: "/login",
    customers: "/customers",
   
    search: "/search/",
    addlicense: "/add/",
    removeLicense: "/remove/",
    deactivate: "/deactivate/",
    detach: "/detach/",
    pending: "/pending",
    activate: "/activate/",

    // support api's
    support: "/support",
    newQuery: "/newquery",
    closeTicket: "/closeticket/",

    compose: "/compose", //mailing api's
    contact: "/contact", //drop message
    trial: "/trial", //free trial email collection api
    coupon: "/coupon/", //Coupon code
    chapaResponse:"/chapa", //payment gateways

};

export default Connection;