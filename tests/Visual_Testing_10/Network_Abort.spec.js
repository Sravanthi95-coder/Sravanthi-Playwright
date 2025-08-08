const { request } = require('http');
const { test, expect } = require('playwright/test');
test('valid registration', async ({ browser }) => {
    const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
    const page = await context.newPage(); // new page will be created ,with in created instance

    // Network abort
    await page.route('**/*.css', route => route.abort()); // Abort Any url having css extension under network tab
    await page.route('**/*.{jpg,jpeg,png}', route => route.abort());// Abort Any image having extension jpg,jpeg,png  under network tab

    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword'); // id css
    const submit = page.locator('#login'); // here name = value, so that we can use value for css
    const cardTitles = page.locator(".card-body b"); //here card-body is class, so we write this as .class

    // print all network requests and response
      page.on('request', request=>console.log(request.url())); // on means its listen the event before occuring,here before open URL
      page.on('response',response=>console.log(response.url(),response.status())); // response will be printed and we can see the status codes

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
    console.log(await cardTitles.nth(0).textContent()); // return the first element from the all the elements
    console.log(await cardTitles.nth(1).textContent());
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);

    await page.waitForTimeout(3000);


});



