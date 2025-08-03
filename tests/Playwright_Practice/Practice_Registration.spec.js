const {test,expect} = require('playwright/test');
test('Practice Registration',async ({browser})=>
{

    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const dropdown = page.locator('select.browser-default'); // tah name paired with tag name, so that it will be uniquely identiifed
    await page.goto("https://qa-practice.netlify.app/register");
    console.log(await page.title());
    await expect(page).toHaveTitle("QA Practice | Learn with RV");
    await page.locator("#firstName").fill("Chilakapati");
    await page.locator("#lastName").fill("Sravanthi");
    await page.locator("#phone").fill('9989109100');
    await page.waitForTimeout(3000);
    await dropdown.selectOption("India");
    await page.locator("#emailAddress").fill("sravanthich2021@gmail.com");
    await page.locator("#password").fill("Myworld@123");
    await page.locator("#exampleCheck1").click();
    await page.locator("#registerBtn").click();
    await page.getByText("The account has been successfully created!").isVisible();


})