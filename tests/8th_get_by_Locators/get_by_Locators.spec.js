import { test, expect } from '@playwright/test'
//const {test,expect} = require('playwright/test');
test('Playwright special locators', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //for radio,checkbox,static dropdowns we can use getByLable locator
    await page.getByLabel("Check me out if you Love IceCreams!").click(); //checkbox
    await page.getByLabel("Employed").check();//radiobutton , instead of click() we can use check also.
    await page.getByLabel("Gender").selectOption("Female");// static gender dropdown
    // Filtering elements with getByRole, getByText , getByPlaceholder and perform chaining methods in step.
    await page.getByPlaceholder("Password").fill("Mypassword@123");// password having placeholder attribute
    await page.getByRole("button", {name: 'Submit'}).click(); // get all the buttons from page and filter required button
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();//get the text where ever found thisin page
    await page.getByRole("link", {name : 'Shop'}).click();//Click on shop link
    // we have common app card locator from that we can select iphone using  filter.
    //want to click on add button for iphone X
    await page.locator("app-card").filter({hasText: 'iphone X'}).getByRole("button").click();//no need to add button name,since having only one button







})