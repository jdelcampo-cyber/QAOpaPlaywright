const { Before, After, AfterStep, BeforeStep, Status } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const path = require('node:path');


Before(async function () {
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page); //sharas global variables across the other tests
});

BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});


AfterStep(async function ({result}) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({
            path: "screenshot1.png",
            fullPage: true
        });
        console.log('Screenshot saved');
    }
});

After(function () {
    console.log("I am the last to execute");
});