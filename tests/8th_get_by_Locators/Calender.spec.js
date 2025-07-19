const{test,expect} = require("@playwright/test");
test("calender validations", async({page})=>{

    const month = "6";
    const date = "15";
    const year = "2027";
    const expectedList =[month,date,year];
    // https://www.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/42325472#questions
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    //first we need to identify the calender at parent level
    await page.locator(".react-date-picker__inputGroup").click();
    //identify and click on month,popup will come to select desired month
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    // select month, first we need to locate all the months, after that select june and click on it
    //june having index 5 ,since array starts from 0th index
    //here moth is string, so we can't subtract 1 from month, so we have make it as number
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    // select date using xpath,we shouldn't make code as hard coded
    await page.locator("//abbr[text()='"+date+"']").click();
    // assertions,validations
   const inputs= await page.locator(".react-date-picker__inputGroup input"); // get all the values of date using common locator,here we have 4 input tags
   for(let index=0;index<inputs.length;++index){     
     const value = inputs[index].getAttribute("value");
     expect(value).toEqual(expectedList[index]);

   }






});