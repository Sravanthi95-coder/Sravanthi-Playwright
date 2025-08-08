const { test, expect } = require('playwright/test');
//1.Verify with selection of gender and capture the selected gender
test('selected_RadioButton', async ({ browser }) =>
{

    const context = await browser.newContext(); 
    const page = await context.newPage();
    const mainHeading = page.locator('.m-0');
    const IndividualHeading = page.locator('.border-bottom .text-light');
    await page.goto("https://testing.qaautomationlabs.com/radio-button.php");
    console.log(await page.title());
    const section1Heading = IndividualHeading.filter({hasText:'Click on button to get the selected value.'});
    const moduleHeading1= await section1Heading.textContent();
    console.log(moduleHeading1);
    await page.locator("//input[@value='Female']").first().click();
    await page.locator("//button[@onclick='showSelectedGender()']").click();
    const result= await page.locator("#result").textContent();
    await page.screenshot({path : 'result.png'});
    console.log(result);
    await page.pause();
});

//2.Verify the disabled radio button
test('Disabled_RadioButton', async ({ browser }) =>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const IndividualHeading = page.locator('.border-bottom .text-light');
    await page.goto("https://testing.qaautomationlabs.com/radio-button.php");
    console.log(await page.title());
     const section2Heading = IndividualHeading.filter({hasText:'Disabled Radio Button'});
    const moduleHeading2= await section2Heading.textContent();
    console.log(moduleHeading2);
    const disabled = await page.locator("//input[@value='Disabled Radio Button']").isDisabled();
    console.log('is radioButton is disabled',disabled);
    await page.pause();
})
//3.Verify whether we are able to select gender and age, capture the selected gender and respective age.
test('Gender_Age', async ({ browser }) =>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const IndividualHeading = page.locator('.border-bottom .text-light');
    await page.goto("https://testing.qaautomationlabs.com/radio-button.php");
    console.log(await page.title());
    const section3Heading = IndividualHeading.filter({hasText:'selected values from Gender and Age'});
    const moduleHeading3= await section3Heading.textContent();
    console.log(moduleHeading3);
    await page.locator("//input[@value='Female']").last().click();
    await page.locator("//input[@value='18-35']").click();
    await page.locator("//button[@onclick='showSelectedValues()']").click();
    const result3 = await page.locator("#result3").textContent();
    await page.screenshot({path:'result3.png'});
    console.log(result3);
    await page.pause();

});
test('MultipleRadio',async({browser})=>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const mainHeading = page.locator('.m-0');
    const IndividualHeading = page.locator('.border-bottom .text-light');
    await page.goto("https://testing.qaautomationlabs.com/radio-button.php");
    console.log(await page.title());
    const section1Heading = IndividualHeading.filter({hasText:'Click on button to get the selected value.'});
    const moduleHeading1= await section1Heading.textContent();
    console.log(moduleHeading1);
    await page.locator("//input[@value='Female']").first().click();
    await page.locator("//input[@value='Male']").first().click();
    await page.locator("//button[@onclick='showSelectedGender()']").click();
    const result4=await page.locator('#result').textContent();
    await page.screenshot({path:'result4.png'});
    console.log(result4);

});
//5.Verify whether we are able to show selected values without selecting gender and age
test('Without_Gender_Age', async ({ browser }) =>
{
    const context = await browser.newContext(); 
    const page = await context.newPage();
    const IndividualHeading = page.locator('.border-bottom .text-light');
    await page.goto("https://testing.qaautomationlabs.com/radio-button.php");
    console.log(await page.title());
    const section3Heading = IndividualHeading.filter({hasText:'selected values from Gender and Age'});
    const moduleHeading3= await section3Heading.textContent();
    console.log(moduleHeading3);
    await page.locator("//button[@onclick='showSelectedValues()']").click();
    const result5 = await page.locator("#result3").textContent();
    console.log(result5);
    await page.screenshot({path:'result5.png'});
    await page.pause();

});


