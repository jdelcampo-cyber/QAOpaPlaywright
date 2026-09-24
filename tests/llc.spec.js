import {test, expect} from '@playwright/test';


test('Playwright Special Locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    console.log(await page.title());

    //getByLabls - checkboxes, radio buttons and dropdowns
    await page.getByLabel("Check me out if you Love IceCreams!").click(); 
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");

    //getByPlaceholder
    await page.getByPlaceholder("Password").fill("Learn@123");

    //getByTole = buttons
    await page.getByRole("button", {name: 'Submit'}).click();

    //getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //5 seconds default timeout for expect assertions - {timeout: 10000} step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 10_000 } );

    //getByRole = links
    await page.getByRole("link", {name: "Shop"}).click();

    //Filter list using getByRole
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    // locator(css) waitfor()

}); 
/*
//30 seconds - test timeout
test('Playwright Test Level timeout', async ({page})=>
{
    //text level timeout
    test.setTimeout(60000); //setting test level timeout
    //waitFor() - )
    const slowExpect = expect.configure({timeout: 9000}); // setting test level expect timeout
    page.setDefaultTimeout(9000); // setting gloval level timeout to test level timeout

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    console.log(await page.title());

    //getByLabls - checkboxes, radio buttons and dropdowns
    await page.getByLabel("Check me out if you Love IceCreams!").click(); 
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");

    //getByPlaceholder
    await page.getByPlaceholder("Password").fill("Learn@123");

    //getByTole = buttons
    await page.getByRole("button", {name: 'Submit'}).click(); //19 seconds


    //getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //5 seconds default timeout for expect assertions - {timeout: 10000} step level
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    //getByRole = links
    await page.getByRole("link", {name: "Shop"}).click({timeout: 15000}); //step-level global timeout
    await slowExpect(page.locator('my-4').first()).toHaveText("Shop");

    //Filter list using getByRole
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    // locator(css) waitfor()

    });
    
*/