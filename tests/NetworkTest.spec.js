const {test,expect,request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtyils');
const newloginPayload = {userEmail:"dfa@gmal.com",userPassword:"Learn@123"};
const orderPayload = {orders:[{country:"New Zealand",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayloadOrders = {data:[],message:"No Orders"};

let response;
// tests to be performed before all the tests in this file
test.beforeAll(async ()=> 
{
    const apiContext = await request.newContext(); 
    const apiUtils = new APIUtils(apiContext,newloginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Place order', async ({page})=>
{   
    await page.addInitScript(value => 
    {
        window.localStorage.setItem('token', value);
    }, response.token); 
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //adding * generates any orderID
    async route =>
    {
       const newResponse = await page.request.fetch(route.request());
       route.fulfill(
        {
            newResponse,
            body: JSON.stringify(fakePayloadOrders),
        });
        //intercepting response - API response->{playwright fake response}->browser->render data on front end
    });
    //orders list
    const order = page.locator("button[routerlink*='myorders']");
    const orderList = page.locator("tbody tr");

    //order list
    await order.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator('.mt-4').textContent());
   
   
});