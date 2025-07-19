const {test,expect} = require('playwright/test');
test('First test case',async ({browser})=>
{

    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    await page.goto("https://playwright.dev/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

})