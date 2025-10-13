const {test,expect} = require('playwright/test');
test('E2E Testing,async',async({browser})=>{
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const products = page.locator(".card-body");// list the all the products
    const prodcutName = 'ADIDAS ORIGINAL';
    //const email = 'sravanthich2021@gmail.com';
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('#userEmail').fill('sravanthich2021@gmail.com');
    await page.locator('#userPassword').fill('Myfirstjob@2021');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    const allcontents= await page.locator(".card-body b").allTextContents();
    console.log(allcontents);
   const count= await products.count();// return count for no.of prodcuts
   // Select and add particualr product to the court
   for(let i=0;i<count;++i)
   {
    if(await products.nth(i).locator("b").textContent() === prodcutName)
   {

        // once conditionmatches add that perticular item to cart
        await products.nth(i).locator("text= Add To Cart").click(); // here we restricted locator search for the product,so that it will select add to cart for the required product only
        break; // condition matches then break the loop
   }


    }
    //steps,Assertions after adding item to cart
    await page.locator("[routerlink*='cart']").click(); // cart button identified by attribute= value css and clicked on that
    await page.locator("div li").first().waitFor(); // wait until all items in cart are loaded,here we write fir this to loaded first item  
    const bool=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible(); // text based locator can write with tag,for only h3 tag only,its a psudo class
    expect(bool).toBeTruthy(); // if item is present test will pass or else will fail,here we are expectting true.

    //checkout added products
    await page.locator("text=Checkout").click() // css based on text to identify checkout button and click
   // await page.pause();
   //My code
   
    let cardNumber=page.locator('//input[@value = "4542 9931 9292 2293"]');
    //expect(cardNumber).toContainText('4542');
    await cardNumber.fill('4542 9931 9292 2293');
    const dropdown1=page.locator("//select[@class = 'input ddl'][1]") // input ddl is class name from dropdown [1]
    await dropdown1.selectOption('01');
    const dropdown2=page.locator("//select[@class = 'input ddl'][2]") // date dropdown thats why we mentioned [2]
    await dropdown2.selectOption('16');
    const CVV = page.locator("(//input[@type='text'])[2]");
    await CVV.fill('666');
    const coupon = page.locator("//input[@name='coupon']");
    await coupon.fill("rahulshettyacademy");
    const button2 = page.locator("//button[@type='submit']");
    await button2.click()
    //await page.pause(); 
    console.log("***********");
    await page.waitForTimeout(3000);
 // Shipping Information

 await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150});//Identify the dropdown location and searching for dropdown values by entering sequentially
 //await page.locator("[placeholder*='Country']").pressSequentially("ind");
 await page.waitForTimeout(3000);
 const dropdown3 = page.locator(".ta-results "); // saved the results in dropdown by using class, .class0
 //await dropdown3.waitFor();// wait for to load all the values in dropdown
 const optionscount = await dropdown3.locator("button").count(); // Count the options in dropdown
 for(let i2=0;i2<optionscount;++i2){  

    let text = await dropdown3.locator("button").nth(i2).textContent(); // get the content in each button through iteration
    console.log(text);
    if(text===" India"){  
      await page.waitForTimeout(3000);
         //await page.locator("//button[@class='ta-item list-group-item ng-star-inserted']//span[text()=' India']").click();   // we can use if(text.trim() ==="india")--> remove extra spaces
         await dropdown3.locator("button").nth(i2).click() // if text is equals to india perforn click operation to select that option
         break;
    }
 }

 //Assertions for shipping information
 expect(page.locator(".user__name [type='text']").first()).toHaveText('sravanthich2021@gmail.com');// to get the first matching element(email id) in shipping information
 await page.locator(".action__submit").click(); // click on place order button
 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
 // parent ,child class to make locator as unique,since if we use child class only it is showing 7 elements.
 await page.waitForTimeout(3000);
 const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(orderId);

 // Dynamically Verifying orderId by clicking on orders button.
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor(); // will wait until all the results are loaded
 //we need to scan all the rows in order page, so that we have to take common parent tag along with child tag
 //parent tag name followed by child tag name
 const rows= await page.locator("tbody tr"); //locate all the rows

 for(let i=0;i< await rows.count();++i){

   const roworderId= await rows.nth(i).locator("th").textContent(); // traverse through all the row orderId
   console.log(roworderId);
   if(orderId.includes(roworderId))
   { // comparing orderId with rowOrderid present in order history and click on view button
    await rows.nth(i).locator("button") .first().click(); // here 2 buttons are there,first button need to click on the row which identified as desired.
    break;    

   }
}
  const orderSummery = await page.locator(".email-title").textContent();
  console.log(orderSummery);
  console.log("******************************************************");
  const orderIdDetails=await page.locator(".col-text").textContent(); // order summery page
   console.log(orderIdDetails);
   //expect(orderId.includes(orderIdDetails)).toBeTruthy();
   // Assertions i can write here is
   // verify email under billing&delivery
   //product added to the cart
   //every validation in order summery page



})