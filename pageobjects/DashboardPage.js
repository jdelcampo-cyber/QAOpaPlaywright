class DashboardPage
{
    constructor(page)
    {
        this.products = page.locator('.card-body');
        this.cardTitles = page.locator('.card-body b');
         this.cart = page.locator("[routerlink*='cart']");
    }
    async searchProductAddCart(productName)
    {
            await this.cardTitles.first().waitFor();
            const allTitles = await this.cardTitles.allTextContents()
            console.log(allTitles);
        
            // get all the list 
            const count = await this.products.count();
            for(let i =0; i < count; ++i)
            {
              if(await this.products.nth(i).locator("b").textContent() === productName)
              {
                //select product to add to cart
                await this.products.nth(i).locator("text = Add to Cart").click();
                break;
              }
            }
    }

    async navigateCart()
    {
        await this.cart.click();
    
    }
}
module.exports = {DashboardPage};