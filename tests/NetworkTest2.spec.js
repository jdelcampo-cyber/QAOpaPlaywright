const { url } = require("node:inspector");
const { test, expect } = require('@playwright/test');


test(' @QW Security test request intercept', async ({ page }) => {
    //login and reuse orders page
    const Email = page.locator('#userEmail');
    const Password = page.locator('#userPassword');
    const regBtn = page.locator('#login');
    const cardTitles = page.locator('.card-body b');
    const order = page.locator("button[routerlink*='myorders']");

    await page.goto("https://rahulshettyacademy.com/client");
    await Email.type("junny@gmail.com");
    await Password.type("Learn@123");
    await regBtn.click();
    await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    await order.click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",   //get the route of any order id row
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a9e7d44e7cd69710fc5d6aa' })) //get the specific order id row
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me").last()).toHaveText("You are not authorize to view this order");

});

// intercept request colls
//    route.continue({ headers, url: 'https://google.com' });
//    route=>route.continue({})