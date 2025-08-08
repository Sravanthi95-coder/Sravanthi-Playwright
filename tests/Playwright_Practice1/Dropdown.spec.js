const { test, expect } = require('playwright/test');
// 1.	Select one option from single selection dropdown
test('singl_Select_dropDown', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const dropDown = page.locator('select.form-control'); // tag.classname
    await page.goto("https://testing.qaautomationlabs.com/dropdown.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Dropdown Demo | QA Automation Labs");
    const heading=await page.locator('.m-0').textContent();
    console.log(heading);
    const modName=await page.locator('.card-tools .border-bottom .text-light').first().textContent();
    console.log(modName);
    await dropDown.selectOption('Mango');
    await page.waitForTimeout(4000);
    const selectedOption=await page.locator('#result').textContent();
    console.log(selectedOption);
    await page.screenshot({path : 'singleOptionDropdown.png'})
    
});

// 2.	Select options from Multi selection option and capture the first selected value and last selected value
 test('Multi_DifferentOptions', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const dropDown = page.locator('#countryDropdown'); // tag.classname
    await page.goto("https://testing.qaautomationlabs.com/dropdown.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Dropdown Demo | QA Automation Labs");
    const heading=await page.locator('.m-0').textContent();
    console.log(heading);
    const modName=await page.locator('.card-tools .border-bottom .text-light').last().textContent();
    console.log(modName);
    await dropDown.selectOption('India');
    await page.locator("//button[@onclick='storeFirstSelection()']").click();
    const result1=await page.locator("#outputFirst").textContent();
    console.log(result1);
    await dropDown.selectOption('USA');
    await page.locator("//button[@onclick='storeLastSelection()']").click();
    const result2=await page.locator("#outputLast").textContent();
    console.log(result2);
    await page.screenshot({path : 'twoDropdownoptions.png'});
    await page.pause();

});

//3.	Select only one option from multi select dropdown, click on first selected, Last selected buttons and capture the results.
test('onlyoneOption', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const dropDown = page.locator('#countryDropdown'); // tag.classname
    await page.goto("https://testing.qaautomationlabs.com/dropdown.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Dropdown Demo | QA Automation Labs");
    const heading=await page.locator('.m-0').textContent();
    console.log(heading);
    const modName=await page.locator('.card-tools .border-bottom .text-light').last().textContent();
    console.log(modName);
    await dropDown.selectOption('India');
    await page.locator("//button[@onclick='storeFirstSelection()']").click();
    const result1=await page.locator("#outputFirst").textContent();
    console.log(result1);
    await page.locator("//button[@onclick='storeLastSelection()']").click();
    const result2=await page.locator("#outputLast").textContent();
    console.log(result2);
    await page.screenshot({path : 'oneoptionselection.png'});
    await page.pause();

});

// 4.	Click on first Selected button or last selected button without selecting option from dropdown, and capture the results.

    test.only('noOptionSelected', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    await page.goto("https://testing.qaautomationlabs.com/dropdown.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Dropdown Demo | QA Automation Labs");
    const heading=await page.locator('.m-0').textContent();
    console.log(heading);
    const modName=await page.locator('.card-tools .border-bottom .text-light').last().textContent();
    console.log(modName);
    await page.locator("//button[@onclick='storeFirstSelection()']").click();
    const result1=await page.locator("#outputFirst").textContent();
    console.log(result1);
    await page.locator("//button[@onclick='storeLastSelection()']").click();
    const result2=await page.locator("#outputLast").textContent();
    console.log(result2);
    await page.screenshot({path : 'noOptionSelected.png'});
    await page.pause();

    });