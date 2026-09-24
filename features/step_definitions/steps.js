const { When, Then, Given, } = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager');
const {expect} = require('@playwright/test');
const  playwright = require('@playwright/test');
const data = require('../../utils/testData.json');

//setDefaultTimeout(60 * 1000);

Given('a login to the Ecommerce application with {string} and {string}', {timeout: 60 * 1000 },  async function (username, password) {
   const loginPage = this.poManager.getLoginPage();
    const toasterMsg = this.page.locator('#toast-container');

    await loginPage.navigatePage();
    await loginPage.validLogin(username,password);
    const msg5 = await toasterMsg.textContent();
    console.log('Toaster message:', msg5);
});

When('Add {string} to Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions 
    const dashboardPage = this.poManager.getDashboardPage();
    const toasterMsg = this.page.locator('#toast-container');

    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateCart();
    await expect(toasterMsg).toContainText("Product");
    const msg6 = await toasterMsg.textContent();
    console.log('Toaster message:', msg6);

});

Then('Verify {string} is displayed in the Cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();

    await cartPage.verifyProductVisible(productName);
    await cartPage.navigateCheckout();
});

When('Enter valid details and Place the Order', async function () {
  // Write code here that turns the phrase above into concrete actions
    const orderReviewPage = this.poManager.getOrderReviewPage();
    const toasterMsg = this.page.locator('#toast-container');

    await orderReviewPage.displayDetails();
    await orderReviewPage.personalInfo( data.cardNumber, data.monthdate, data.daydate, data.cardexpiry, data.cardHolder, data.couponcode);
    await orderReviewPage.shippingInfo(data.username, "ja", "Japan");
    await orderReviewPage.placeOrder();
    await expect(toasterMsg).toContainText("Order");
    const msg8 = await toasterMsg.textContent();
    console.log('Toaster message:', msg8);
    this.orderID = await orderReviewPage.getOrderID();
    console.log(this.orderID);
});

Then('Verify the order is present in the OrderHistory', async function () {
  // Write code here that turns the phrase above into concrete actions
   const orderHistoryPage = this.poManager.getOrderHistoryPage();
  
    await orderHistoryPage.viewOrderList(this.orderID);
    await orderHistoryPage.viewOrderDetails(this.orderID, data.username, "Japan", data.productName);

});

Given('a login to the Ecommerce2 application with {string} and {string}', async function (unsername, passwword) {
    const unserName = this.page.locator('#username');
    const passWord = this.page.locator("[type='password']");
    const signIn = this.page.locator('#signInBtn');
    
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //css, xpath
    await unserName.type(unsername);
    await passWord.type(passwword);
    await signIn.click();
});

Then('Verify Error Message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
    