const {test,expect} = require('playwright/test');
test('Childwindow and tabs', async({browser})=>
{
     const context = await browser.newContext(); // to create a fresh browser without plugins and cookies,only browser instance created
     const page = await context.newPage(); // new page will be created ,with in created instance
     const username = page.locator('#username'); // locator from parent window
     const blink = page.locator("[href*='documents-request']");
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     const expected = await expect(blink).toHaveAttribute("class", "blinkingText");
     
    const[newPage]=  await Promise.all(

        [
        context.waitForEvent('page'), // it will listen the page that created when we click on blinked text.
        blink.click(),               //the above promise will be in one of three states pending,rejected,accepted


     ])
     //newpage will be returned , we have locate elemets using this new page instead of page,since its a new webpage .
     const text = await newPage.locator(".red").textContent();
     console.log(text);
     //Pull the academy name only from entire text in the child window and use that email id in parent window
     //for that i need to split the total string to get academy name only.
     /* we need split based on delimiter "Please email us at mentor@rahulshettyacademy.com with below template to receive response"
        above text split two parts based on @ and stored in array,it will divide as two parts right side of @ and left side of @
        i.e Please email us at mentor ,rahulshettyacademy.com with below template to receive response
        from the above two parts i need domain name,that is in right side, so i need to split that right part based on whitespace in between
        domain name and remaining part in right side of array */
        const arrayText = text.split("@"); // split into two part
        console.log(arrayText); // our required domain will fall into right side i.e index 1
        const domain = arrayText[1].split(" ")[0];// so split index 1,result will be stored in index 0
        console.log(domain);
        // the domain name we got from child window we have use in our parent window as user name.
        await username.fill(domain);
       await  page.pause();
      console.log(await username.textContent()) ;
      






        


    
     
    


})