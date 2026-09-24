import { test, expect, Locator, Page } from '@playwright/test';

export class OrderReviewPage
{
    page: Page;
    dropdown: Locator;
    emailField: Locator;
    country: Locator;  
    orderConfirm: Locator;
    payment: Locator;  
    date: Locator;
    paymentType: Locator;
    card: Locator;  
    coupon: Locator;
    orderBtn: Locator;  

    constructor(page:Page)
    {
        this.page = page;
        this.dropdown = page.locator('.ta-results');
        this.emailField = page.locator(".user__name  [type='text']");
        this.country = page.locator("[placeholder*='Country']");
        this.orderBtn = page.locator('.action__submit');
        this.orderConfirm = page.locator('.hero-primary');
        this.payment = page.locator('.payment__types');
        this.paymentType = page.locator('.icon-credit-card');
        this.card = page.locator("[type='text']");
        this.date = page.locator('.ddl');
        this.coupon = page.locator('.btn-primary');

    }
    
   async displayDetails()
   {
    const allTypes = await this.payment.allTextContents()
    console.log(allTypes);
    const types =  this.paymentType.isEnabled();
    expect(types).toBeTruthy();
   }

   async personalInfo(cardNumber:string,monthdate:string,daydate:string,cardexpiry:string,cardHolder:string,couponcode:string)
   {
    //personal information
    const cardNum = await this.card.first().allTextContents();
    console.log(cardNum);
    await this.card.first().type(cardNumber);
    await this.date.first().selectOption(monthdate);
    await this.date.last().selectOption(daydate);
    await this.card.nth(1).type(cardexpiry);
    await this.card.nth(2).type(cardHolder);
    await this.card.nth(3).type(couponcode);
    await this.coupon.click();
    console.log(await this.page.locator("[style='color: green;']").textContent());
   }

   async shippingInfo(username:string,countryCode:string,countryName:string)
   {
    //shipping information
    expect(this.emailField.first()).toHaveText(username);
    const emailTxt = await this.emailField.last().textContent();
    console.log(emailTxt);

    //select option in type in search
    await this.country.pressSequentially(countryCode, {delay:100});    //type-in search
    await this.dropdown.waitFor();
    const options = await this.dropdown.locator("button").count();
    for(let i=0; i < options; ++i)
    {
       const text:any = await this.dropdown.locator("button").nth(i).textContent();
        if(text.trim() === countryName)
        {
            await this.dropdown.locator("button").nth(i).click();
            break;
        }
    }
   }

   async placeOrder()
   {
     await this.orderBtn.click();
     await expect(this.orderConfirm).toHaveText(" Thankyou for the order. ");
   }

   async getOrderID()
   {
       return await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   }
}
module.exports = {OrderReviewPage};