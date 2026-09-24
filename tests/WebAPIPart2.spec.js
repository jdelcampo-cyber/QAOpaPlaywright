// Login UI - .json

// test brwoser - .json, cart, order, orderdetails, orderhistory

const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const Email = page.locator('#userEmail');
    const Password = page.locator('#userPassword');
    const regBtn = page.locator('#login');

    await page.goto("https://rahulshettyacademy.com/client");
    await Email.type("junny@gmail.com");
    await Password.type("Learn@123");
    await regBtn.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
});



test('Cliont App Playwright test assignment', async ()=>
{
    const page = await webContext.newPage();
    const toasterMsg = page.locator('#toast-container');
    //product list
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const productName = "ZARA COAT 3";
    const cart = page.locator("[routerlink*='cart']");
    //checkout page
    const userEmail = "junny@gmail.com";
    const dropdown = page.locator('.ta-results');
    const checkout = page.locator("text = Checkout");
    const cartList = page.locator("div li");
    const emailField = page.locator(".user__name  [type='text']");
    const country = page.locator("[placeholder*='Country']");
    const orderBtn = page.locator('.action__submit');
    const orderConfirm = page.locator('.hero-primary');
    const payment = page.locator('.payment__types');
    const paymentType = page.locator('.icon-credit-card');
    const card = page.locator("[type='text']");
    const date = page.locator('.ddl');
    const coupon = page.locator('.btn-primary');
    //orders list
      const order = page.locator("button[routerlink*='myorders']");
      const orderList = page.locator("tbody tr");
    const ordernNum = page.locator('.col-text');
    const details = page.locator("div div p.text");
    const prodName = page.locator('.title');
  
    await page.goto("https://rahulshettyacademy.com/client");

    // check list
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles);

    // get all the list 
    const count = await products.count();
    for(let i =0; i < count; ++i)
    {
      if(await products.nth(i).locator("b").textContent() === productName)
      {
        //select product to add to cart
        await products.nth(i).locator("text = Add to Cart").click();
        break;
      }
    }
    await cart.click();
    await expect(toasterMsg).toContainText("Product");
    const msg6 = await toasterMsg.textContent();
    console.log('Toaster message:', msg6);

    //cart list
    await cartList.first().waitFor(); //waiting for page load
    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkout.click();
    
    //checkout page
    const allTypes = await payment.allTextContents()
    console.log(allTypes);
    const types =  paymentType.isEnabled();
    expect(types).toBeTruthy();

    //personal information
    const cardNum = await card.first().allTextContents();
    console.log(cardNum);
    await card.first().fill(" ");
    await card.first().fill("4423772671013078");
    await date.first().selectOption("11");
    await date.last().selectOption("24");
    await card.nth(1).fill("345");
    await card.nth(2).fill("Jun del Campo");
    await card.nth(3).fill("12345");
    await coupon.click();
    console.log(await page.locator("[style='color: red;']").textContent());
    await card.nth(3).fill(" ");
    await card.nth(3).fill("rahulshettyacademy");
    await coupon.click();
    console.log(await page.locator("[style='color: green;']").textContent());

    //shipping information
    expect(emailField.first()).toHaveText(userEmail);
    const emailTxt = await emailField.last().textContent();
    console.log(emailTxt);
    await emailField.last().fill(" ");
    await orderBtn.click();
    await expect(toasterMsg).toContainText("Please");
    const msg7 = await toasterMsg.textContent();
    console.log('Toaster message:', msg7);
    await emailField.last().fill("dfa@gmail.com");

    //select option in type in search
    await country.pressSequentially("ja", {delay:100});    //type-in search
    await dropdown.waitFor();
    const options = await dropdown.locator("button").count();
    for(let i=0; i < options; ++i)
    {
       const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "Japan")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await orderBtn.click();

    //confimation 
    await expect(toasterMsg).toContainText("Order");
    const msg8 = await toasterMsg.textContent();
    console.log('Toaster message:', msg8);
    await expect(orderConfirm).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    //order list
    await order.click();
    //scan order list to get the latest order
    await page.locator("tbody").waitFor();
    const rows = await orderList;
    for(let i =0; i < await rows.count(); ++i)
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if(orderID.includes(rowOrderId))
      {
        //view order of rhe selected OrderID
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    //view order - assertions
    const orderDetails = await ordernNum.textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();
    const emailDetails = await details.first().textContent();
    expect(emailDetails.includes(userEmail)).toBeTruthy();
    const countryDetails = await details.nth(1).textContent();
    expect(countryDetails.includes("Japan")).toBeTruthy();
    const emailDetails2 = await details.nth(2).textContent();
    expect(emailDetails2.includes(userEmail)).toBeTruthy();
    const countryDetails2 = await details.last().textContent();
    expect(countryDetails2.includes("Japan")).toBeTruthy();
     const prodDetails = await prodName.textContent();
    expect(prodDetails.includes("ZARA COAT 3")).toBeTruthy();
});

test(' @API Test case 2', async ()=>
{
    const page = await webContext.newPage();
    const toasterMsg = page.locator('#toast-container');
    //product list
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const productName = "ZARA COAT 3";
    const cart = page.locator("[routerlink*='cart']");
    //checkout page
    const userEmail = "junny@gmail.com";
    const dropdown = page.locator('.ta-results');
    const checkout = page.locator("text = Checkout");
    const cartList = page.locator("div li");
    const emailField = page.locator(".user__name  [type='text']");
    const country = page.locator("[placeholder*='Country']");
    const orderBtn = page.locator('.action__submit');
    const orderConfirm = page.locator('.hero-primary');
    const payment = page.locator('.payment__types');
    const paymentType = page.locator('.icon-credit-card');
    const card = page.locator("[type='text']");
    const date = page.locator('.ddl');
    const coupon = page.locator('.btn-primary');
    //orders list
    const order = page.locator("button[routerlink*='myorders']");
    const orderList = page.locator("tbody tr");
    const ordernNum = page.locator('.col-text');
    const details = page.locator("div div p.text");
    const prodName = page.locator('.title');

    await page.goto("https://rahulshettyacademy.com/client");

    // check list
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles);

});