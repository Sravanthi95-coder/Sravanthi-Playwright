class shippingPO {
    constructor(page) {
        this.page = page;
        
        this.country = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results ");
        this.dropdown3 = page.locator(".ta-results "); // saved the results in dropdown by using class, .class0 
       

       
    }
    async shipping() {
        const countrySelection = this.country.pressSequentially("ind", { delay: 150 });
        
        //await dropdown3.waitFor();// wait for to load all the values in dropdown
        const optionscount = await this.dropdown3.locator("button").count(); // Count the options in dropdown
        for (let i2 = 0; i2 < optionscount; ++i2) {

            let text = await this.dropdown3.locator("button").nth(i2).textContent(); // get the content in each button through iteration
            console.log(text);
            if (text === " India") {
                await page.waitForTimeout(3000);
                //await page.locator("//button[@class='ta-item list-group-item ng-star-inserted']//span[text()=' India']").click();   // we can use if(text.trim() ==="india")--> remove extra spaces
                await this.dropdown3.locator("button").nth(i2).click() // if text is equals to india perforn click operation to select that option
                break;
                
            }
           
        }
        
    }
}
module.exports = { shippingPO };