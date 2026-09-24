const { expect } = require('@playwright/test');

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartList = page.locator("div li").first();
        this.checkout = page.locator("text = Checkout");
    }
    async verifyProductVisible(productName)
    {
       // await this.cartList.waitFor(); //waiting for page load
        const bool = await this.locateProduct(productName).isVisible();
       // expect(bool).toBeTruthy();
    }

    locateProduct(productName)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
    
    async navigateCheckout()
    {
        await this.checkout.click();
    }

}
module.exports = {CartPage};