const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtyils');
const { WARNING_MESSAGE } = require('../utils/constants');

const loginPayload = {email: "junny@gmail.com", password: "Learn@123"};
const eventPayload = { title: "FIFA World Cup New", description: "The FIFA World Cup, often called the World Cup, is an international association football competition among the senior men's national teams of the members of the Fédération Internationale de Football Association (FIFA)", category: "Sports", venue: "Shinkansen Stadium Tokyo", city: "Tokyo", eventDate: "2028-11-11T03:30:00.000Z", imageUrl: "https://tse4.mm.bing.net/th/id/OIP.s72rTmr-7ZaBI3H_STAzSQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", price: 120, totalSeats: 5 };

let response;

// tests to be performed before all the tests in this file
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createEvent(eventPayload);
});

test(' @AT Create Events', async ({ page }) => {
    await page.addInitScript(token => {
        window.localStorage.setItem('eventhub_token', token);
    }, response.token);
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.waitForLoadState('domcontentloaded');
    const events = page.locator("#nav-events");
    await events.click();
    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events?*", //adding * generates any orderID
        async route => {
            const newResponse = await page.request.fetch(route.request());
            route.fulfill(
                {
                    newResponse,
                    body: JSON.stringify({
                        data: [],
                        message: WARNING_MESSAGE
                    }),
                });
            //intercepting response - API response->{playwright fake response}->browser->render data on front end
        });

    await page.waitForResponse("https://api.eventhub.rahulshettyacademy.com/api/events?*");
    const warningBox = page.locator('.mb-6');
    await expect(warningBox).toHaveText(WARNING_MESSAGE);
});