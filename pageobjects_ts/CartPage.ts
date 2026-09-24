import { test, expect, Locator, Page } from '@playwright/test';

export class CartPage
{
    page: Page;
    cartList: Locator;
    checkout: Locator;
    
    constructor(page: Page)
    {
        this.page = page;
        this.cartList = page.locator("div li").first();
        this.checkout = page.locator("text = Checkout");
    }
    async verifyProductVisible(productName:string)
    {
       // await this.cartList.waitFor(); //waiting for page load
        const bool = await this.locateProduct(productName).isVisible();
       // expect(bool).toBeTruthy();
    }

    locateProduct(productName:string)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
    
    async navigateCheckout()
    {
        await this.checkout.click();
    }

}
module.exports = {CartPage};