const {test,expect} = require('playwright/test');

// here we have three types of browser fixers,we can use any type from below.These are the ways to kick start automation from playwright.

test('First test case',async ({browser})=> // Anonymus function,function doesn't have any name.
{
      const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
      const page = await context.newPage(); // new page will be created ,with in created instance
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
      console.log(await page.title());//get the title of website
      await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy") // we have put await or else things get messed up
     


}

);