const { test, expect, request } = require('@playwright/test');
const { newtest } = require('../utils/fixtures');
let webContext;

//new fixture created in the curly brackets
newtest("Login and Event Fixtures", async ({ authenticatedPage, createEvent }) => {
     const event = authenticatedPage.locator("#nav-events");

    await event.click();
    await authenticatedPage.locator("h1").waitFor();
   // await expect(authenticatedPage.getByText(createEvent.data.title)).toBeVisible({ timeout: 10000 });
});