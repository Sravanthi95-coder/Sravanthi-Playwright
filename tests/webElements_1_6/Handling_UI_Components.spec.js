const {test,expect} = require('playwright/test');

test('Dropdowns',async({browser})=>{
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control'); // dropdown is a class, so we write it as tagname.classname- this make it as unique
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await page.waitForTimeout(3000);
    await dropdown.selectOption("consult"); // from drop down select consultant,we saved this location in dropdown variable.
    await page.waitForTimeout(3000);
    await signIn.click();
    console.log(await page.title());
    //await page.pause(); // this open one inspector called playwright inspector. 

    
});
test('radiobutton', async({browser})=>
{
     const context = await browser.newContext();
     const page = await context.newPage();
     const okaybtn = page.locator("#okayBtn");
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     // here we have 2 radio buttons, so i want to select second one (lastone),If we have more than 2 radio button we can select based on below code
     //await page.locator(".radiotextsty").nth(1).click(); 2nd radio button selected,here 1 is index
     await page.locator(".radiotextsty").last().click(); 
     // Here we need to validate whether the button is clicked or not //assertion
     await expect(page.locator(".radiotextsty").last()).toBeChecked();//if radio button checked then testcase will pass or else it will fail.
      console.log(await page.locator(".radiotextsty").last().isChecked());// if checked return boolean true,or else return false
     await okaybtn.click();
    // await page.pause();
     
});
test('checkboxes', async({browser})=>
{
    const context = await browser.newContext();
    const page= await context.newPage();
    const terms = page.locator('#terms');
    const blink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await terms.click();
    await expect(terms).toBeChecked();
    console.log(await terms.isChecked());// return boolean value- true,since the above we have written for select the check box
    await page.waitForTimeout(3000);
    await terms.uncheck(); // Uncheck the check box
    console.log(await terms.isChecked()); // return boolean value as false ,since the  above we have written for unselect the check box
    expect(await terms.isChecked()).toBeFalsy();
    //check the blinking text are present or not
   const expected = await expect(blink).toHaveAttribute("class", "blinkingText");
   //await page.pause(); //Inspection window will open, browser stays until we closed that.
   
});