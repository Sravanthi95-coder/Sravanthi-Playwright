
const { expect } = require('@playwright/test');
class cartPagePO {
    constructor(page) {
        this.page = page;
        this.firstItem = page.locator("div li").first();
        this.checkOut = page.locator("text=Checkout");
        this.myOrders = page.locator("button[routerlink*='myorders']");
    }

    getProductLocator(productName) {
        return this.page.locator(`h3:has-text("${productName}")`);
    }

    async verifyProductDisplayed(productName) {
        await this.firstItem.waitFor();
        const checkElement = await this.getProductLocator(productName).isVisible();
        await expect(checkElement).toBeTruthy();
    }

    async checkOutOrders() {
        await this.checkOut.click();
    }
}

module.exports = { cartPagePO };