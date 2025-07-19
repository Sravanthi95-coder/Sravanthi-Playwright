// While initializing playwright we can see tests folder- where we have to create test files
// Another one is playwright.config.js - this is the runner of js files to run the test files.
const {test} = require('playwright/test');

// here we have three types of browser fixers,we can use any type from below.These are the ways to kick start automation from playwright.

test('First test case',async ({browser})=> // Anonymus function,function doesn't have any name.
{
      const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
      const page = await context.newPage(); // new page will be created ,with in created instance
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
}

);
// we can write same set of above 3 statements like below without contex and page step

test('Browser contex declaration',async ({browser,page})=> // Here playwright thinks need to create one fresh browser and opens a page
{
      
      await page.goto("https://www.google.com/")
});
test('Page playwright test',async ({page})=> // Here playwright thinks need to create one fresh browser and opens a page
{
      
      await page.goto("https://www.youtube.com/")
});
     
      