const { test, expect, request } = require('@playwright/test');
//const { customtest } = require('../utils/APIUtyils');
const { customtest } = require('../utils/fixtures');

let webContext;
//new fixture created in the curly brackets
customtest("Fixtures Demo", async ({ authenticatedPage, createOrder, testDataForOrder }) => {
     const order = authenticatedPage.locator("button[routerlink*='myorders']");

    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await order.click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderID)).toBeVisible();
    console.log(testDataForOrder.productName);
});