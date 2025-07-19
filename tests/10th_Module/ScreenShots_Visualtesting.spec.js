const {test,expect} = require('playwright/test');
test('screenshots',async({browser})=>{
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword'); // id css
    const submit = page.locator('#login'); // here name = value, so that we can use value for css
    const cardTitles = page.locator(".card-body b"); //here card-body is class, so we write this as .class
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.waitForTimeout(3000);
    console.log(await page.title());
    expect(page).toHaveTitle("Let's Shop");
    await username.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await submit.click();
    console.log(await page.title());
    expect(page).toHaveTitle("Let's Shop");
     // network idle means in networks all API calls are loaded without any pending so that all contents displayed on UI,sometimes not working
     //await page.waitForLoadState('networkidle')
    //await page.waitForTimeout(3000);
    await cardTitles.first().waitFor();
    await page.screenshot({path : 'screenshot3.png'}); // take a screen shot after login full screen shot

    console.log(await cardTitles.nth(0).textContent()); // return the first element from the all the elements
    console.log(await cardTitles.nth(1).textContent());
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);
    console.log(await page.locator(".left").textContent());
    await page.locator('.left').screenshot({path : 'Partial_ScreenShot.png'}); // screen has taken at locator level,partial screen shot
    await page.waitForTimeout(3000);
});
test.only('VisualTesting',async({browser,page})=>
{
      await page.goto("https://rahulshettyacademy.com/client");
      expect(await page.screenshot()).toMatchSnapshot('RahulShetty.png');

});



