const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('./Utils/APiUtils');
const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
const fakePayLoadOrders= {"data":[],"message":"No Orders"};
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext(); //First create a context
   const apiUtils = new APiUtils(apiContext,loginPayLoad); // create an object for API_Utils.here we logged in
   response =  await apiUtils.createOrder(orderPayLoad); // create order before every execution
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);  //login storage stored in session storage, to initialize we have to use setItem
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
/* API Response->browser->rendered data on front end
So, here we have routed the response means we have to hijack the response before sending to the browser.
We insert fake response that response sends to browser 
API Response(Playwright Fake Response}browserrendered data on front end
fake response by playwright. */

 await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",// here star means regular exp,accept anything,based on account.
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
// Dynamically Verifying orderId by clicking on orders button.
 await page.locator("button[routerlink*='myorders']").click();
 // If we are not writing below line of code , actual response and fake response will be messed up,so we have to write below wait statement.
 //await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
 const emptyCartMessage=await page.locator(".mt-4").textContent();
 console.log(emptyCartMessage);
 await page.locator('button', { hasText: 'Go Back to Cart' }).click();
 await page.pause();
 await page.locator('button', { hasText: 'Continue Shopping' }).click();
 

 //await page.locator("tbody").waitFor();  // will wait until all the results are loaded
 //we need to scan all the rows in order page, so that we have to take common parent tag along with child tag
 //parent tag name followed by child tag name
//const rows = await page.locator("tbody tr"); //locate all the rows
 
});
 
//Verify if order created is showing in history page
// Precondition - create order 