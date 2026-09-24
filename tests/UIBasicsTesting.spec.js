const { test, expect } = require('@playwright/test');
const { request } = require('node:http');


test('@Web Browser Context Playwright test', async ({ browser }) => {
//switching to a new btanch - my_fices
    const context = await browser.newContext();
    const page = await context.newPage();
  //  page.route("**/*.{jpg,png,jpeg}", route => route.abort()); // **/* means any urls regardless of UI (omages, pages,forms)
    const unserName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(),response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css, xpath
    await unserName.type("junnydelcampo");
    await passWord.type("Learning@830$3mK2");
    await signIn.click();
    // wait until this locator shown up page
    //wewbdriverwait
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type.--  fill
    await unserName.fill("");
    await unserName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.nth(2).textContent());
    console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles);

});


test(' @Web UI controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const unserName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const documentLink = page.locator("[href*='documents-request']");
    const skillsLink = page.locator("[href*='techsmarthire']");
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    //confirm radio button selection
    console.log(page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //  await expect(skillsLink).toHaveAttribute("class", "blinkingText");
    //assertion
    // await page.pause();
});


test('Child window handler', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const unserName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const skillsLink = page.locator("[href*='techsmarthire']");

    //first new page
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new page - pending, rejected, fulfilled
        //opening new page in new tab
        documentLink.click(),
    ]) //new page will be opened
    const text = await newPage.locator('.red').textContent(); //get the value displayed
    //getting the email from the new page
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    //using email from new page to parent
    await page.locator("#username").type(domain);
    //await page.pause();
    console.log(await page.locator("#username").inputValue()); //capture the inputted value

    /*
    //second new page
    const [newPage2] = await Promise.all([
        page.waitForLoadState('domcontentloaded'), //listen for any new page - pending, rejected, fulfilled
        //opening new page in new tab
        console.log(await skillsLink.textContent()),
        skillsLink.click({force : true}), 
    ]) //new page will be opened
*/
});