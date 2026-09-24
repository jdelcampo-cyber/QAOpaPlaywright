const {test, expect, selectors} = require('@playwright/test');


test('Cliont App Playwright test assignment', async ({page})=>
{

    await page.goto("https://rahulshettyacademy.com/client/#/");
    console.log(await page.title());

    const regLink = page.getByText("Register here");
    const firstName = page.getByPlaceholder("First Name");
    const lastName = page.getByPlaceholder("Last Name");
    const Email = page.getByPlaceholder("email@example.com");
    const Phone = page.getByPlaceholder("enter your number");
    const Occupation = page.locator("[formcontrolname='occupation']");
    const Gender = page.getByLabel("Male");
    //const Password1 = page.getByPlaceholder("enter your passsword");
    const Password = page.locator('#userPassword');
    const conFirm = page.getByPlaceholder("Confirm Passsword");
    const checkBox = page.locator("[type='checkbox']");
    const errorMessages = page.locator('.invalid-feedback');
    const checkError = page.locator("[style='width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #dc3545;']");
    const loginLink = page.getByText("Login here");
    const toasterMsg = page.locator('#toast-container');
    const successMsg = page.getByText("Account Created Successfully");
    const loginBtn = page.getByRole("button");
    const login = page.locator('#login');
    const regBtn = page.getByRole("button",{name:'Register'});

    //product list
     const cartList = page.locator("div li");
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const cart = page.getByRole("listitem").getByRole("button", {name: "Cart"});

    //checkout page
    const checkout = page.getByRole("button",{name:"Checkout"});
    const emailField = page.locator(".user__name  [type='text']");
    const country = page.getByPlaceholder("Select Country");
    const orderBtn = page.getByText("PLACE ORDER");
    const orderConfirm = page.getByText("Thankyou for the order");
    const payment = page.locator('.payment__types');
    const paymentType = page.locator('.icon-credit-card');
    const card = page.locator("[type='text']");
    const date = page.locator('.ddl');
    const coupon = page.getByRole("button",{name:"Apply Coupon"});

    //orders list
    const order = page.getByRole("listitem").getByRole("button", {name: "ORDERS"});
    const orderList = page.locator("tbody tr");
    const ordernNum = page.locator('.col-text');
    const details = page.locator("div div p.text");
    const prodName = page.locator('.title');

    //register
    await regLink.click();

    //error checking
    await regBtn.click();
    console.log(await errorMessages.first().textContent());
    console.log(await errorMessages.nth(1).textContent());
    console.log(await errorMessages.nth(2).textContent());
    console.log(await errorMessages.nth(3).textContent());
    console.log(await errorMessages.last().textContent());
    console.log(await checkError.textContent());    
    await Email.type("fgdxfg");
    console.log(await errorMessages.nth(1).textContent());
    await Phone.type("fgf");
    console.log(await errorMessages.nth(2).textContent());
    await Phone.type("09437642534");
    console.log(await errorMessages.nth(2).textContent()); 
    await Password.type("345");
    await conFirm.type("dfgdd");
    console.log(await errorMessages.last().textContent());

    //successful registration
    await firstName.type("Junny");
    await lastName.type("del Campo");
    await Email.fill("");
    await Email.fill("junny17@gmail.com");
    await Phone.fill("");
    await Phone.type("4567434564");
    await Occupation.selectOption({value : '3: Engineer'});
    await Gender.first().check();

     //password error
    await Password.fill("");
    await Password.fill("12345678");
    await conFirm.fill("");
    await conFirm.fill("12345678");
    await checkBox.check();
    await expect(checkBox).toBeChecked();
    await regBtn.click();
    await expect(toasterMsg).toContainText('Please'); 

    const msg1 = await toasterMsg.textContent();
    console.log('Toaster message:', msg1);

    await Password.fill("");
    await Password.fill("1234");
    await conFirm.fill("");
    await conFirm.fill("1234");
    await regBtn.click();
    await expect(toasterMsg).toContainText("Password");

    const msg2 = await toasterMsg.textContent();
    console.log('Toaster message:', msg2);
    
    //existing email
    await Email.fill("");
    await Email.fill("dfa@gmail.com");
    await Password.fill("");
    await Password.fill("Learn@123");
    await conFirm.fill("");
    await conFirm.fill("Learn@123");
    console.log(await loginLink.textContent()); 
    await regBtn.click();
    await expect(toasterMsg).toContainText("User");

    const msg3 = await toasterMsg.textContent();
    console.log('Toaster message:', msg3);

    //successful registration
    await Email.fill("");
    await Email.fill("junny149@gmail.com");
    await Password.fill("");
    await Password.fill("Learn@123");
    await conFirm.fill("");
    await conFirm.fill("Learn@123");
    await checkBox.check();
    await regBtn.click();
  //  await expect(toasterMsg).toContainText("Registered");

    const msg4 = await toasterMsg.textContent();
    console.log('Toaster message:', msg4);

    //console.log(await successMsg.textContent());
    await loginBtn.click();

    //login
    await Email.type("junny149@gmail.com");
    await Password.fill("Learn@123");
    await login.click();

   // await expect(toasterMsg).toContainText("Login");

    const msg5 = await toasterMsg.textContent();
    console.log('Toaster message:', msg5);
   
    // check list
    await page.waitForLoadState('networkidle');
   // await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

   // await expect(products.first()).toBeVisible();

    await products.filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: " Add To Cart"}).click();

    await expect(toasterMsg).toContainText("Product");
    const msg6 = await toasterMsg.textContent();
    console.log('Toaster message:', msg6);

    await cart.click();

    //cart list
    await cartList.first().waitFor(); //waiting for page load
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await checkout.click();
    
    //checkout page
    const allTypes = await payment.allTextContents()
    console.log(allTypes);
    await expect(paymentType).toBeEnabled();

    //personal information
    const cardNum = await card.first().allTextContents();
    console.log(cardNum);
    await card.first().fill(" ");
    await card.first().fill("4423772671013078");
    await date.first().selectOption("11");
    await date.last().selectOption("24");
    await card.nth(1).fill("345");
    await card.nth(2).fill("Jun del Campo");
    await card.nth(3).fill("12345");
    await coupon.click();
    console.log(await page.locator("[style='color: red;']").textContent());
    await card.nth(3).fill(" ");
    await card.nth(3).fill("rahulshettyacademy");
    await coupon.click();
    console.log(await page.locator("[style='color: green;']").textContent());

    //shipping information
    expect(emailField.first()).toHaveText("junny@gmail.com");
    await emailField.last().fill(" ");
    await orderBtn.click();

    await expect(toasterMsg).toContainText("Please");
    const msg7 = await toasterMsg.textContent();
    console.log('Toaster message:', msg7);
    await emailField.last().fill("dfa@gmail.com");

    //select option in type in search
    await country.pressSequentially("ja", {delay:100});    //type-in search
    await page.getByRole("button",{name: "Japan"}).click();
    await orderBtn.click();

    //confimation 
    await expect(toasterMsg).toContainText("Order");
    const msg8 = await toasterMsg.textContent();
    console.log('Toaster message:', msg8);

    await expect(orderConfirm).toBeVisible();
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    //order list
    await order.click();
    //scan order list to get the latest order
    await page.locator("tbody").waitFor();
    const rows = await orderList;
    for(let i =0; i < await rows.count(); ++i)
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if(orderID.includes(rowOrderId))
      {
        //view order of rhe selected OrderID
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    //view order - assertions
    const orderDetails = await ordernNum.textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();
    const emailDetails = await details.first().textContent();
    expect(emailDetails.includes("junny@gmail.com")).toBeTruthy();
    const countryDetails = await details.nth(1).textContent();
    expect(countryDetails.includes("Japan")).toBeTruthy();
    const emailDetails2 = await details.nth(2).textContent();
    expect(emailDetails2.includes("junny@gmail.com")).toBeTruthy();
    const countryDetails2 = await details.last().textContent();
    expect(countryDetails2.includes("Japan")).toBeTruthy();
     const prodDetails = await prodName.textContent();
    expect(prodDetails.includes("ZARA COAT 3")).toBeTruthy();
});
