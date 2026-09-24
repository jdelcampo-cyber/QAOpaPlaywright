import { test, expect, Locator, Page } from '@playwright/test';

export class OrderHistoryPage
{
    page: Page;
    order: Locator;
    orderList: Locator;
    ordernNum: Locator;  
    details: Locator;
    prodName: Locator;  

    constructor(page:Page)
    {
        this.page = page;
        this.order = page.locator("button[routerlink*='myorders']");
        this.orderList = page.locator("tbody tr");
        this.ordernNum = page.locator('.col-text');
        this.details = page.locator("div div p.text");
        this.prodName = page.locator('.title');
    }
    
    async viewOrderList(orderID:any)
    {
    await this.order.click();
    //scan order list to get the latest order
    await this.page.locator("tbody").waitFor();
    const rows = await this.orderList;
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
    }

    async viewOrderDetails(orderID:any,username:string,countryName:string,productName:string)
    {
    //view order - assertions
    const orderDetails : any = await this.ordernNum.textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();
    const emailDetails : any = await this.details.first().textContent();
    expect(emailDetails.includes(username)).toBeTruthy();
    const countryDetails : any = await this.details.nth(1).textContent();
    expect(countryDetails.includes(countryName)).toBeTruthy();
    const emailDetails2 : any = await this.details.nth(2).textContent();
    expect(emailDetails2.includes(username)).toBeTruthy();
    const countryDetails2 : any = await this.details.last().textContent();
    expect(countryDetails2.includes(countryName)).toBeTruthy();
     const prodDetails : any = await this.prodName.textContent();
    expect(prodDetails.includes(productName)).toBeTruthy();
    }
}
module.exports = {OrderHistoryPage};