const { test, expect } = require('playwright/test');
/*
1.Verify whether we are able to select single checkbox under single check box demo,
 and also verify the text “checked” after selecting checkbox. */

test('SingleCheckbox', async ({ browser }) =>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const singleCheckBoxHeading = page.locator(".card-tools .border-bottom .text-light").filter({ hasText: 'Single Checkbox Demo' })
    await page.goto("https://testing.qaautomationlabs.com/checkbox.php");
    console.log(await page.title());
    await expect(page).toHaveTitle("Checkbox Demo | QA Automation Labs");
    await singleCheckBoxHeading.isVisible();
    const singleBox=await singleCheckBoxHeading.textContent();
    console.log(singleBox);
    await page.locator('#myCheckbox').click();
    const confirmMessage = await page.locator('#message').textContent();
    console.log(confirmMessage);
    await page.screenshot({path:'singlecheckbox.png'});
    await page.pause();

});
/*2.Verify whether we are able to select multiple checkboxes and also
   verify are we able to select disabled checkbox under Disabled checkbox demo */
test('Disabled_CheckBox', async ({ browser }) =>
{
   const context = await browser.newContext(); 
   const page = await context.newPage();
   const DisabledCheckBox= page.locator(".card-tools .border-bottom .text-light").filter({hasText:'Disabled Checkbox Demo'});
   await page.goto("https://testing.qaautomationlabs.com/checkbox.php");
   console.log(await page.title());
   expect(page).toHaveTitle("Checkbox Demo | QA Automation Labs");
   await DisabledCheckBox.isVisible();
   const DisabledCheckBoxHeading= await DisabledCheckBox.textContent();
   console.log(DisabledCheckBoxHeading);
   await page.locator('#chk1').click();
   const isDisabledCheckbox = await page.locator('#chk3').isDisabled();
   console.log('Checkbox is disabled:', isDisabledCheckbox);
});
/*
  3.Verify whether we are able to select Multiple checkboxes individually under Multiple checkbox demo
   select all the checkboxes using check All button
   select uncheck All to uncheck all the text boxes and uncheck individually. */
  test('Multiple Checkbox Demo', async ({ browser }) =>
  {
   const context = await browser.newContext(); 
   const page = await context.newPage();
   const MultipleCheckBox= page.locator(".card-tools .border-bottom .text-light").filter({hasText:'Multiple Checkbox Demo'});
   await page.goto("https://testing.qaautomationlabs.com/checkbox.php");
   console.log(await page.title());
   expect(page).toHaveTitle("Checkbox Demo | QA Automation Labs");
   await MultipleCheckBox.isVisible();
   const MultipleCheckBoxHeading= await MultipleCheckBox.textContent();
   console.log(MultipleCheckBoxHeading);
   await page.locator('#multichk1').click();
   await page.locator('#multichk2').click();
   await page.locator('#multichk3').click();
   await page.locator('#multichk4').click();
   await page.locator('#toggleBtn').click();
   await page.locator('#multichk1').check();
   await page.screenshot({path : 'MultipleCheckBox.png'});
   await page.pause();

});
//4. Select checkbox under each section and uncheck as well.
test.only('Check_Each', async ({ browser }) =>
  {
   const context = await browser.newContext(); 
   const page = await context.newPage();
   const singleCheckBox = page.locator(".card-tools .border-bottom .text-light").filter({ hasText: 'Single Checkbox Demo' })
   const DisabledCheckBox= page.locator(".card-tools .border-bottom .text-light").filter({hasText:'Disabled Checkbox Demo'});
   const MultipleCheckBox= page.locator(".card-tools .border-bottom .text-light").filter({hasText:'Multiple Checkbox Demo'});
   await page.goto("https://testing.qaautomationlabs.com/checkbox.php");
   console.log(await page.title());
   expect(page).toHaveTitle("Checkbox Demo | QA Automation Labs");
   await singleCheckBox.isVisible();
   const singleCheckBoxHeading = await singleCheckBox.textContent();
   console.log(singleCheckBoxHeading);
   await MultipleCheckBox.isVisible();
   const MultipleCheckBoxHeading= await MultipleCheckBox.textContent();
   console.log(MultipleCheckBoxHeading);
   await DisabledCheckBox.isVisible();
   const DisabledCheckBoxHeading = await DisabledCheckBox.textContent();
   console.log(DisabledCheckBoxHeading);
   await page.locator('#myCheckbox').check();
   await page.locator('#chk1').check();
   await page.locator('#multichk1').check();
   page.screenshot({path : 'checkeach.png'});
   await page.locator('#myCheckbox').uncheck();
   await page.locator('#chk1').uncheck();
   await page.locator('#multichk1').uncheck();
   await page.screenshot({path : 'UnCheckEach.png'});
   await page.pause();

});

