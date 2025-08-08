const {test,expect} = require('playwright/test');

// here we have three types of browser fixers,we can use any type from below.These are the ways to kick start automation from playwright.

test('First test case',async ({browser})=> // Anonymus function,function doesn't have any name.
     
{
      
      const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
      const page = await context.newPage(); // new page will be created ,with in created instance
      const userName = page.locator('#username'); // we can use this locator whereever required,since we saved this in const.
      const signIn =   page.locator("#signInBtn");
      const cardTitles = page.locator(".card-body a");
      //const dropdown = page.locator('select.form-control');
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());//get the title of website
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy"); // we have put await or else things get messed up
      await page.locator('#username').fill("rahulshetty");
      //await userName.fill("rahulshetty");//we used const
      await page.locator("[type='password']").fill("learning");
      //await dropdown.selectOption('consult');
      await signIn.click();
      //await page.waitForTimeout(10000); // Waits for 10 seconds
      //Generate error message with incorrect user name ,password and extract the content also
    console.log(await page.locator("[style*='block']").textContent());//to get the error message or any title we can use same
    // using Assertions we can validate web pages using expect keyword
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    // With the above lines of code we checked login with invalid credentials and capture the error message,now we are going to check with correct credentials
    // so before entering correct credentials we have to wipedout all the existing credentials in login page
    await userName.fill("");
    await page.waitForTimeout(3000);
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    await page.waitForTimeout(3000);
    // get the titles after login eg : phone names
   // console.log(await page.locator(".card-body a").first().textContent());// we can use this to select first one in page i.e iphonex
      //console.log(await cardTitles.nth(0).textContent()); // it will return item present in 0th index
      //console.log(await cardTitles.nth(1).textContent()); // it will return item present in 1st index
      //grab all the titles and store in a variable and printout
      const allCardTitles=console.log(await cardTitles.allTextContents())
    
     


}

);