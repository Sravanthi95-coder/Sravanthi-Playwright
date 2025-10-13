const { test, expect } = require('playwright/test');
const{customtest} = require('../Utils/Fixture_test_base');

const { loginPO } = require('../PageObjects/loginPO');// import login object file
const { dashBoardPO } = require('../PageObjects/dashBoardPO');//import dashboard object file
const { cartPagePO } = require('../PageObjects/cartPagePO'); // import cartpage object file
const { shippingPO } = require('../PageObjects/shippingPO');// import shipping object file
const { paymentPO } = require("../PageObjects/paymentPO");// import payment object file  
const { POManager } = require('../PageObjects/POManager');
//json->string->javaScript object
const testData = JSON.parse(JSON.stringify(require('../Utils/e2e_testing_PO_testdata.json')));// imported test data json file 




customtest(`E2E Testing_Fixture`, async ({ browser,testDataForOrder }) => {

   const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
   const page = await context.newPage(); // new page will be created ,with in created instance
   const products = page.locator(".card-body");// list the all the products

   //*******************************************************************************************
   const loginpagePO = new loginPO(page);// created objects for loginPO file
   await loginpagePO.goto();// call goto method from loginPO file
   await loginpagePO.validLogin(testDataForOrder.username, testDataForOrder.password);
   //********************************************************************************************

   const dashBoardPOobj = new dashBoardPO(page); // created object for dashBoardPO file
   await dashBoardPOobj.searchProduct_AddCart(testDataForOrder.productName);
   await dashBoardPOobj.navigateToCart();
   // *********************************************************************************************
   const cartPagePOobj = new cartPagePO(page);
   await cartPagePOobj.verifyProductDisplayed(testDataForOrder.productName);
   await cartPagePOobj.checkOutOrders();
   // **********************************************************************************************
   const shippingPOobj = new shippingPO(page);
   await shippingPOobj.shipping();
   //**********************************************************************************************
   const paymentPOobj = new paymentPO(page);
   await paymentPOobj.payment();
   await paymentPOobj.shipping();
   // ***********************************************************************************************
   const POManagerobj = new POManager(page);
   const loginPage = POManagerobj.getLoginPage();
   await POManagerobj.getdashBoardPage();
   await POManagerobj.getCartPage();
   await POManagerobj.getshippingPage();


   //expect(page.locator(".user__name [type='text']").first()).toHaveText('sravanthich2021@gmail.com');// to get the first matching element(email id) in shipping information
   await page.locator(".action__submit").click(); // click on place order button
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   // parent ,child class to make locator as unique,since if we use child class only it is showing 7 elements.
   await page.waitForTimeout(3000);
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   //Dynamically Verifying orderId by clicking on orders button.
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor(); // will wait until all the results are loaded
   //we need to scan all the rows in order page, so that we have to take common parent tag along with child tag
   //parent tag name followed by child tag name
   const rows = await page.locator("tbody tr"); //locate all the rows

   for (let i = 0; i < await rows.count(); ++i) {

      const roworderId = await rows.nth(i).locator("th").textContent(); // traverse through all the row orderId
      console.log(roworderId);
      if (orderId.includes(roworderId)) { // comparing orderId with rowOrderid present in order history and click on view button
         await rows.nth(i).locator("button").first().click(); // here 2 buttons are there,first button need to click on the row which identified as desired.
         break;

      }
   }
   const orderSummery = await page.locator(".email-title").textContent();
   console.log(orderSummery);
   console.log("******************************************************");
   const orderIdDetails = await page.locator(".col-text").textContent(); // order summery page
   console.log(orderIdDetails);
   //expect(orderId.includes(orderIdDetails)).toBeTruthy();
   // Assertions i can write here is
   // verify email under billing&delivery
   //product added to the cart
   //every validation in order summery page



})
