class dashBoardPO {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.titles = page.locator(".card-body b");
    this.addToCart = page.locator("[routerlink*='cart']");
  }

  async searchProduct_AddCart(productName) {
    const allContents = await this.titles.allTextContents();
    console.log(allContents);

    const count = await this.products.count(); // return count for no. of products

    // Select and add particular product to the cart
    for (let i = 0; i < count; ++i) {
      const title = await this.products.nth(i).locator("b").textContent();
      if (title?.trim() === productName) {
        // Once condition matches, add that particular item to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break; // Condition matches, then break the loop
      }
    }
  }

  async navigateToCart() {
    await this.addToCart.click();
  }
}

module.exports = { dashBoardPO};