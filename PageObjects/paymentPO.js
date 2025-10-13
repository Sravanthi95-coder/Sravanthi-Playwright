class paymentPO {
    constructor(page) {
        this.page = page;
        this.cardNumber = page.locator('//input[@value = "4542 9931 9292 2293"]');
        this.dropdown1 = page.locator("//select[@class = 'input ddl'][1]");
        this.dropdown2 = page.locator("//select[@class = 'input ddl'][2]");
        this.CVV = page.locator("(//input[@type='text'])[2]");
        this.coupon = page.locator("//input[@name='coupon']");
        this.button2 = page.locator("//button[@type='submit']");
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown3 = page.locator(".ta-results ");
        this.submit = page.locator(".action__submit");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.loadResults = page.locator("tbody");
        this.orderSummery = page.locator(".email-title");
        this.orderId = page.locator(".col-text");
    }
    async payment() {

        await this.cardNumber.fill('4542 9931 9292 2293');
        await this.dropdown1.selectOption('01');
        await this.dropdown2.selectOption('16');
        await this.CVV.fill('666');
        await this.coupon.fill("rahulshettyacademy");
        await this.button2.click()
        //await page.pause(); 
        console.log("***********");
        await this.page.waitForTimeout(3000);
    }
    async shipping() {
        await this.country.pressSequentially("ind", { delay: 150 });//Identify the dropdown location and searching for dropdown values by entering sequentially
        //await page.locator("[placeholder*='Country']").pressSequentially("ind");
        await this.page.waitForTimeout(3000);
       // const dropdown3 = page.locator(".ta-results "); // saved the results in dropdown by using class, .class0
        //await dropdown3.waitFor();// wait for to load all the values in dropdown
        const optionscount = await this.dropdown3.locator("button").count(); // Count the options in dropdown
        for (let i2 = 0; i2 < optionscount; ++i2) {

            let text = await this.dropdown3.locator("button").nth(i2).textContent(); // get the content in each button through iteration
            console.log(text);
            if (text === " India") {
                await this.page.waitForTimeout(3000);
                //await page.locator("//button[@class='ta-item list-group-item ng-star-inserted']//span[text()=' India']").click();   // we can use if(text.trim() ==="india")--> remove extra spaces
                await this.dropdown3.locator("button").nth(i2).click() // if text is equals to india perforn click operation to select that option
                break;
            }
        }
    } 

}
module.exports = {paymentPO };