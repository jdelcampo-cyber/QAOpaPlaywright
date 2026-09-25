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
    await apiContext.dispose();
});

test(' @AT Create Events', async ({ page }) => {
    await page.route("**/api/events**",
        async route => {
            route.fulfill(
                {
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        data: [],
                        message: WARNING_MESSAGE
                    }),
                });
            //intercepting response - API response->{playwright fake response}->browser->render data on front end
        });

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByRole('textbox', { name: 'Email' }).fill('junny@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Learn@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('domcontentloaded');
    const events = page.locator("#nav-events");
    await events.click();
    await expect(page.getByText('Try adjusting your filters or search terms to find what you\'re looking for.', { exact: true })).toBeVisible();
});