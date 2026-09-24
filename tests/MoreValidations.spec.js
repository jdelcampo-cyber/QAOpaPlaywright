const { test, expect } = require('@playwright/test');
const { Agent } = require('node:http');

//test.describe.configure({ mode: 'parallel' }); //run tests in parallel
//test.describe.configure({ mode: 'serial' }); //runs tests in order
test(" @Web Popup Validations", async ({ page }) => {
        await page.goto(
                "https://rahulshettyacademy.com/AutomationPractice/",
                { waitUntil: 'domcontentloaded', timeout: 60000 }
        );
        await expect(page.locator('#displayed-text')).toBeVisible();
        await page.locator('#hide-textbox').click();
        await expect(page.locator('#displayed-text')).toBeHidden();

        //broswer modals
        await page.locator('#confirmbtn').click();
        await page.on('dialog', dialog => dialog.accept());
        await page.locator('#confirmbtn').click();
        await page.on('dialog', dialog => dialog.dismiss());

        //hover
        await page.locator('#mousehover').hover();

        //frames
        const framesPage = page.frameLocator('#courses-iframe');
        await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
        const textCheck = await framesPage.locator('.text h2').textContent();
        console.log(textCheck.split(' ')[1]); //split the text and get the second word

});


test("Screenshot comparison", async ({ page }) => {
        await page.goto(
                "https://rahulshettyacademy.com/AutomationPractice/",
                { waitUntil: 'domcontentloaded', timeout: 60000 }
        );
        await expect(page.locator('#displayed-text')).toBeVisible();
        await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' }); // specific element
        await page.locator('#hide-textbox').click();
        await page.screenshot({ path: 'screenshot.png' }); // whole page
        await expect(page.locator('#displayed-text')).toBeHidden();

});
//screenshot -> store -> screenswhot

test("Visual comparison", async ({ page }) => {
        await page.goto("https://www.google.com/");
        const logo = page.locator("[aria-label='Google']");
        // Ensure the element is fully rendered
        await expect(logo).toBeVisible({ timeout: 10000 });

        // Take a stable screenshot
        const screenshot = await logo.screenshot({ animations: 'disabled' });

        await expect(screenshot).toMatchSnapshot('landing.png');

});