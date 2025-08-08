const { test, expect } = require('playwright/test');
test('form_Valid details', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    await page.goto("https://testing.qaautomationlabs.com/form.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Form Demo | QA Automation Labs");
    const Heading = await page.locator('.m-0').textContent();
    console.log(Heading);
    const title = await page.locator('.card-tools .border-bottom .text-light').textContent();
    console.log(title);
    const firstName = await page.locator("#firstname").fill('Chilakapati');
    const middleName = await page.locator("#middlename").fill('N/A')
    const lastName = await page.locator("#lastname").fill('Sravanthi')
    const email = await page.locator("#email").fill('sravanthich2021@gmail.com')
    const password = await page.locator("#password").fill('Mypassword@123')
    const Address = await page.locator("#address").fill('ABC Street,victoria City')
    const city = await page.locator('#city').fill("bcd city");
    const state = await page.locator("#states").fill('xyz state')
    const Pincode = await page.locator("#pincode").fill('111000')
    await page.locator("//button[@type='submit']").click();
    const message = await page.locator("#message").textContent();
    console.log(message);
    await page.screenshot({ path: 'Form.png' });
    await page.pause();

});
// 2.Verify the form with missing values
test('Missing_details', async ({ browser }) => 
{
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    await page.goto("https://testing.qaautomationlabs.com/form.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Form Demo | QA Automation Labs");
    const Heading = await page.locator('.m-0').textContent();
    console.log(Heading);
    const title = await page.locator('.card-tools .border-bottom .text-light').textContent();
    console.log(title);
    const firstName = await page.locator("#firstname").fill('Chilakapati');
    await page.locator("//button[@type='submit']").click();
    const message = await page.locator("#message").textContent();
    console.log(message);
    // validation message
    const Valmessage = await page.$eval('#middlename', el => el.validationMessage);
    console.log('Validation message:', Valmessage);
    await page.pause();

});
//3.Verify the empty form by submitting.
test('emptyForm', async ({ browser }) => 
{
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    await page.goto("https://testing.qaautomationlabs.com/form.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Form Demo | QA Automation Labs");
    const Heading = await page.locator('.m-0').textContent();
    console.log(Heading);
    await page.locator("//button[@type='submit']").click();
    const Valmessage1 = await page.$eval('#firstname', el => el.validationMessage);
    console.log('Validation message:', Valmessage1);
    await page.pause();
    

});
//4.Verify form with invalid email
test.only('Invalid_email', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    await page.goto("https://testing.qaautomationlabs.com/form.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Form Demo | QA Automation Labs");
    const Heading = await page.locator('.m-0').textContent();
    console.log(Heading);
    const title = await page.locator('.card-tools .border-bottom .text-light').textContent();
    console.log(title);
    const firstName = await page.locator("#firstname").fill('Chilakapati');
    const middleName = await page.locator("#middlename").fill('N/A')
    const lastName = await page.locator("#lastname").fill('Sravanthi')
    const email = await page.locator("#email").fill('sravanthich2021') // Invalid email form
    const password = await page.locator("#password").fill('Mypassword@123')
    const Address = await page.locator("#address").fill('ABC Street,victoria City')
    const city = await page.locator('#city').fill("bcd city");
    const state = await page.locator("#states").fill('xyz state')
    const Pincode = await page.locator("#pincode").fill('111000')
    await page.locator("//button[@type='submit']").click();
    const message = await page.locator("#message").textContent();
    console.log(message);
    const Valmessage1email = await page.$eval('#email', el => el.validationMessage);
    console.log('Validation message:', Valmessage1email);
    await page.screenshot({ path: 'Form.png' });
    await page.pause();

});
