const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../../Utils/APiUtils');
const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
 
 
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
// Dynamically Verifying orderId by clicking on orders button.
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();  // will wait until all the results are loaded
 //we need to scan all the rows in order page, so that we have to take common parent tag along with child tag
 //parent tag name followed by child tag name
const rows = await page.locator("tbody tr"); //locate all the rows
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent(); // traverse through all the row orderId
   if (response.orderId.includes(rowOrderId)) // comparing orderId with rowOrderid present in order history and click on view button
   {
       await rows.nth(i).locator("button").first().click(); // here 2 buttons are there,first button need to click on the row which identified as desired.
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent(); // order number in summery page
const thankyouMessage = await page.locator(".tagline").textContent(); // Thankyou message in summery page
   console.log(thankyouMessage);
   console.log("******************************************************");
   console.log(orderIdDetails);
   const productOrderedmessage = await page.locator(".col-md-12").textContent();
   console.log(productOrderedmessage);
   const ProductName = await page.locator(".artwork-card-info  .title").textContent();// product name in summery page
   console.log(ProductName);
   const viewOrders = await page.locator(".btn-container").click()// click on view orders button in summery page
   const signOutBtn = await page.locator(".btn-custom .fa-sign-out").click();// click on signout button
  // expect(page.locator(".login-title [type='text']")).toHaveText('Log in');
   await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
//Verify if order created is showing in history page
// Precondition - create order -