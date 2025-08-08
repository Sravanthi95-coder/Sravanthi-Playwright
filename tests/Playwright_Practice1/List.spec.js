const { test, expect } = require('playwright/test');
//1.	Select one option from list and click on Add 
test('Add_Button', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const dropDown = page.locator('select.form-control'); // tag.classname
    await page.goto("https://testing.qaautomationlabs.com/list-box.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("List Box Demo | QA Automation Labs");
    const heading = await page.locator('.m-0').textContent();
    console.log(heading);
    const modName = await page.locator('.card-tools .border-bottom .text-light').textContent();
    console.log(modName);
    // Pick one name from the list
    await page.selectOption('#list1', 'Mayra');
    await page.locator('#add').click();
    const List2 = await page.locator('#list2').textContent();
    console.log("ItemAdded to list2", List2);
    await page.screenshot({ path: 'Addoption.png' });
    await page.pause();

});
// 2.	Click on Add All button to select all the items and capture list 2
test.only('AddAll', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const dropDown = page.locator('select.form-control'); // tag.classname
    await page.goto("https://testing.qaautomationlabs.com/list-box.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("List Box Demo | QA Automation Labs");
    const heading = await page.locator('.m-0').textContent();
    console.log(heading);
    const modName = await page.locator('.card-tools .border-bottom .text-light').textContent();
    console.log(modName);
    // click on addAll button
    await page.locator('#addAll').click();
    const addedListNames = await page.locator('#list2').textContent(); // get all the items from list
    console.log(addedListNames);
    async function splitByCapitalLetters(addedListNames)
    {
        return addedListNames.match(/[A-Z][a-z]*/g) || [];
    }
    const names = await splitByCapitalLetters(addedListNames);
    console.log("🧪 Output of splitByCapitalLetters:", names);
    names.forEach(names => console.log("✔️ ", names));
    await page.screenshot({ path: 'AddAll.png' });
    await page.pause();

});