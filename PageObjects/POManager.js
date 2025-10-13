const { loginPO } = require('../PageObjects/loginPO');// import login object file
const { dashBoardPO } = require('../PageObjects/dashBoardPO');//import dashboard object file
const { cartPagePO } = require('../PageObjects/cartPagePO'); // import cartpage object file
const { shippingPO } = require('../PageObjects/shippingPO');// import shipping object file
const { paymentPO } = require("../PageObjects/paymentPO");// import payment object file
class POManager {
    constructor(page) {
        this.page = page;
        this.loginpagePO = new loginPO(this.page);
        this.dashBoardPOobj = new dashBoardPO(this.page);
        this.cartPagePOobj = new cartPagePO(this.page);
        this.shippingPOobj = new shippingPO(this.page)
    }
    async getLoginPage() {
        return this.loginpagePO;
    }
    async getdashBoardPage() {
        return this.dashBoardPOobj;
    }
    async getCartPage() {
        return this.cartPagePOobj;
    }
    async getshippingPage() {
        return this.shippingPOobj;
    }
}
module.exports = { POManager };