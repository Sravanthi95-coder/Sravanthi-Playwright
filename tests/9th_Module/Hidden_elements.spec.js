// https://www.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31110670#questions
//https://rahulshettyacademy.com/AutomationPractice/

const {test,expect} = require('@playwright/test');
const { text } = require('express');
test("hidden and popup validations",async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /*
    await page.goto("https://www.google.com/");
    await page.goBack(); // backward
    await page.goForward(); // forward 
    */
   await expect(page.locator("#displayed-text")).toBeVisible();// textbox should be visible before clicking on hide button
   await page.locator("#hide-textbox").click(); // click on hide button
   await expect(page.locator("#displayed-text")).toBeHidden(); // text should be hidden after clicking on hide button
   //If we want to accept popup or dialog we can write below,playwright listen event
   page.on('dialog',dialog=>dialog.accept());
   /*
   If we want to cancel popup we can use dismiss() function
   page.on('dialog',dialog=>dialog.dismiss());

   */
  await page.locator('#confirmbtn').click();
  //mouse hover example
  await page.pause();
  await page.locator("#mousehover").hover();
  //we have to switch to frame,then only we can perform actions on frame elements
  const framePage=page.frameLocator('#courses-iframe');
  /* want to click on All Access plan link in frame,so we have to identify that using css,but here when we use anchor it is showing 
    3 elements,so we can make it unique by giving parent tag li ,after using parent tag li also it is showing 2 elements,one is visble element
    on page ,another one is hidden element, so we have to specify playwright that choose visible element only. */
   //new page object is created,since we are working with frames

   await framePage.locator("li a[href*='lifetime-access']:visible").click();
   /* if we see join 13522 happy subscribers in page ,so we have extract 13522 only
   join -[0]
   13522- [1]
   happy subscribers -[2] */
   const textCheck = await framePage.locator(".text h2").textContent(); // extract the text
   console.log(textCheck.split(" ")[1]) // divide extracted text into indexes ,with array indexes.
   











        

}
)