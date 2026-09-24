const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtyils.js');
const { ACCESS_DENIED_TITLE, ACCESS_DENIED_MESSAGE } = require('../utils/constants.js');

const loginPayload = { email: "junny@gmail.com", password: "Learn@123" }; //user A
const bookingPayload = { customerName: "Marky Yap", customerEmail: "generic@gmail.com", customerPhone: "6457477645", eventId: 1, quantity: 1 }

let response;

// tests to be performed before all the tests in this file
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createBooking(bookingPayload);
});

test(' @BE Create Booking', async ({ browser, page }) => {
    await page.addInitScript(token => {
        window.localStorage.setItem('eventhub_token', token);
    }, response.token);

    await page.goto("https://eventhub.rahulshettyacademy.com/");
    const bookings = page.getByTestId('nav-bookings');
    const bookId = page.locator('#booking-id');

    await bookings.click();
    // await expect(bookId.first()).toBeVisible();

    const bookingLink = page.locator('a[href*="/bookings/"]').first();
    await expect(bookingLink).toBeVisible();   // best practice
    const bookUrl = await bookingLink.getAttribute('href');
    //  const bookUrl = await page.locator('a[href*="/bookings/"]').first().getAttribute('href');
    console.log("Relative booking path:", bookUrl); // e.g. /bookings/150152
    await page.goto(`https://eventhub.rahulshettyacademy.com${bookUrl}`);
    await page.waitForLoadState('domcontentloaded');
    const currentUrl = page.url();
    console.log("Captured current URL:", currentUrl);
    await expect(currentUrl).toContain(bookUrl);

    const bookingUrl = response.bookingUrl;
    console.log("Booking URL from User A:", bookingUrl);

    //UserB troes to use UserA URL
    const contextB2 = await browser.newContext({ storageState: 'userB.json' });
    const pageB2 = await contextB2.newPage();
    await pageB2.goto('https://eventhub.rahulshettyacademy.com/login');
    await pageB2.locator('#email').fill('junny@gmail.com');
    await pageB2.locator('#password').fill('Learn@123');
    await pageB2.locator('#login-btn').click();
    await expect(pageB2.locator('#user-email-display')).toContainText('junny@gmail.com');

    // Use User A’s booking URL
    await pageB2.goto(bookingUrl);
    await pageB2.waitForURL(bookingUrl);
    console.log("Booking URL for User B:", bookingUrl);
    await expect(pageB2.locator('h3.mb-2')).toHaveText(ACCESS_DENIED_TITLE);
   // await expect(pageB2.locator('p.mb-6')).toHaveText(ACCESS_DENIED_MESSAGE);

    await contextB2.close();

});