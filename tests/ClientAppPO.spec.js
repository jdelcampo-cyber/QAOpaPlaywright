//Author : Junny
const {test, expect} = require('@playwright/test');
const {newcustomtest} = require('../utils/testbase');
const {POManager} = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));  //convert Json -> string -> js object

for(const data of dataSet)
{ 
//change testnames for test data iterations
test(`  @Web Cliont App Playwright test assignment ${data.productName}`, async ({page})=>
{    
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const orderReviewPage = poManager.getOrderReviewPage();
    const orderHistoryPage = poManager.getOrderHistoryPage();

    const toasterMsg = page.locator('#toast-container');

    //login - created one js file
    await loginPage.navigatePage();
    await loginPage.validLogin(data.username,data.password);
   // await expect(toasterMsg).toContainText("Login");
    const msg5 = await toasterMsg.textContent();
    console.log('Toaster message:', msg5);
   
    // dashboard 
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateCart();
    await expect(toasterMsg).toContainText("Product");
    const msg6 = await toasterMsg.textContent();
    console.log('Toaster message:', msg6);

    //cart 
    await cartPage.verifyProductVisible(data.productName);
    await cartPage.navigateCheckout();
    
    //orderreview
    await orderReviewPage.displayDetails();
    await orderReviewPage.personalInfo(data.cardNumber, data.monthdate, data.daydate, data.cardexpiry, data.cardHolder, data.couponcode);
    await orderReviewPage.shippingInfo(data.username, "ja", "Japan");
    await orderReviewPage.placeOrder();
    await expect(toasterMsg).toContainText("Order");
    const msg8 = await toasterMsg.textContent();
    console.log('Toaster message:', msg8);
    const orderID = await orderReviewPage.getOrderID();
    console.log(orderID);

    //orderhistory
    await orderHistoryPage.viewOrderList(orderID);
    await orderHistoryPage.viewOrderDetails(orderID, data.username, "Japan", data.productName);

});
}

newcustomtest(`Cliont App Playwright test assignment`, async ({page, testDateOrder})=>
{    
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const orderReviewPage = poManager.getOrderReviewPage();
    const orderHistoryPage = poManager.getOrderHistoryPage();

    const toasterMsg = page.locator('#toast-container');

    //login - created one js file
    await loginPage.navigatePage();
    await loginPage.validLogin(testDateOrder.username,testDateOrder.password);
  //  await expect(toasterMsg).toContainText("Login");
    const msg5 = await toasterMsg.textContent();
    console.log('Toaster message:', msg5);
   
    // dashboard 
    await dashboardPage.searchProductAddCart(testDateOrder.productName);
    await dashboardPage.navigateCart();
    await expect(toasterMsg).toContainText("Product");
    const msg6 = await toasterMsg.textContent();
    console.log('Toaster message:', msg6);

    //cart 
    await cartPage.verifyProductVisible(testDateOrder.productName);
    await cartPage.navigateCheckout();
    
    //orderreview
    await orderReviewPage.displayDetails();
    await orderReviewPage.personalInfo(testDateOrder.cardNumber, testDateOrder.monthdate, testDateOrder.daydate, testDateOrder.cardexpiry, testDateOrder.cardHolder, testDateOrder.couponcode);
    await orderReviewPage.shippingInfo(testDateOrder.username, "ja", "Japan");
    await orderReviewPage.placeOrder();
    await expect(toasterMsg).toContainText("Order");
    const msg8 = await toasterMsg.textContent();
    console.log('Toaster message:', msg8);
    const orderID = await orderReviewPage.getOrderID();
    console.log(orderID);

    //orderhistory
    await orderHistoryPage.viewOrderList(orderID);
    await orderHistoryPage.viewOrderDetails(orderID, testDateOrder.username, "Japan", testDateOrder.productName);

});

//test files will trigger parallel mode
//individual tests in a file will trigger in sequence