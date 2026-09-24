const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtyils');
const newloginPayload = {userEmail:"junny@gmal.com",userPassword:"Learn@123"};
const orderPayload = {orders:[{country:"New Zealand",productOrderedId:"6a9f86ebe7cd69710fc7e566"}]};
let response;

// tests to be performed before all the tests in this file
test.beforeAll(async ()=> 
{
    const apiContext = await request.newContext(); 
    const apiUtils = new APIUtils(apiContext,newloginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

//tests to be performed before each test in this file (i.e. test 1, test 2, test3)
// test.beforeEach(()=>
// {

// });


test(' @API Place order', async ({page})=>
{   
    await page.addInitScript(value => 
    {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto("https://rahulshettyacademy.com/client/");

    //orders list
    const order = page.locator("button[routerlink*='myorders']");
    const orderList = page.locator("tbody tr");
    const ordernNum = page.locator('.col-text');
    const details = page.locator("div div p.text");
    const prodName = page.locator('.title');
    
    //order list
    await order.click();
    //scan order list to get the latest order
    await page.locator("tbody").waitFor();
    const rows = await orderList;
    for(let i =0; i < await rows.count(); ++i)
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if(response.orderID.includes(rowOrderId))
      {
        //view order of rhe selected OrderID
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    //view order - assertions
    const orderDetails = await ordernNum.textContent();
    await page.pause();
    expect(response.orderID.includes(orderDetails)).toBeTruthy();
    // const emailDetails = await details.first().textContent();
    // expect(emailDetails.includes(userEmail)).toBeTruthy();
    const countryDetails = await details.nth(1).textContent();
    expect(countryDetails.includes("New Zealand")).toBeTruthy();
    // const emailDetails2 = await details.nth(2).textContent();
    // expect(emailDetails2.includes(userEmail)).toBeTruthy();
    const countryDetails2 = await details.last().textContent();
    expect(countryDetails2.includes("New Zealand")).toBeTruthy();
     const prodDetails = await prodName.textContent();
    expect(prodDetails.includes("ZARA COAT 3")).toBeTruthy();
});

//verify the orders are displayed in the list page
// Precondition - create order and check order id