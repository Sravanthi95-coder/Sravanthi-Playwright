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
await page.locator("[routerlink*='myorders']").click();
await page.pause();

    // pre requisite is  we need to login and create order
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6873e78d6eb377753099b5f3' }));// ready with playwright
    await page.locator("button:has-text('View')").first().click();// order page and click on view button
    console.log(await page.locator("//p[@class='blink_me']").textContent());
    await page.pause();

})