const base = require('@playwright/test');
const {APIUtils} = require('./APIUtyils.js');
const {request} = require('@playwright/test');

const loginPayload = {userEmail:"junny@gmail.com",userPassword:"Learn@123"};
const orderPayload = {orders:[{country:"Japan",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const newloginPayload = {email: "junny2@gmail.com", password: "Learn@123"}; //user A
const eventPayload = { title: "FIFA World Cup", description: "The FIFA World Cup, often called the World Cup, is an international association football competition among the senior men's national teams of the members of the Fédération Internationale de Football Association (FIFA)", category: "Sports", venue: "Shinkansen Stadium Tokyo", city: "Tokyo", eventDate: "2028-11-11T03:30:00.000Z", imageUrl: "https://tse4.mm.bing.net/th/id/OIP.s72rTmr-7ZaBI3H_STAzSQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", price: 120, totalSeats: 5 };

export const test = base.extend({
  apiUtils: async ({ request }, use) => {
    const loginPayload = {
      email: 'junny@gmail.com',
      password: 'Learn@123'
    };

    const apiUtils = new APIUtils(request, loginPayload);
    await use(apiUtils);
  }
}); 

exports.customtest = base.test.extend(
    { // each custom tests contain group of fixtures in that specific tests
        authenticatedPage: async ({ browser }, use) => {
            //login ppage
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

            await use(page);
            //tear down
            await context.close();
        },
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(orderPayload);
            
            await use(response);
            //tear down
            await apiContext.dispose();
        },

        testDataForOrder: {
            productName: 'ADIDAS ORIGINAL'
        }
    });

    exports.newtest = base.test.extend(
    { // each custom tests contain group of fixtures in that specific tests
        authenticatedPage: async ({ browser }, use) => {
            //login ppage
            const context = await browser.newContext();
            const page = await context.newPage();
            const email = page.getByRole('textbox', { name: 'Email' });
            const password = page.getByRole('textbox', { name: 'Password' });
            const login =  page.getByRole('button', { name: 'Sign In' });

            await page.goto("https://eventhub.rahulshettyacademy.com/login");
            await email.type("junny@gmail.com");
            await password.type("Learn@123");
            await login.click();
            await page.waitForLoadState('networkidle');

            await use(page);
            //tear down
            //await context.close();
        },
        createEvent: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, newloginPayload);
            const response = await apiUtils.createEvent(eventPayload);
            
            console.log("API Response:", response.event);

            await use(response.event);
            //tear down
            await apiContext.dispose();
        }
    });