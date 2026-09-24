const { expect } = require('@playwright/test');

class OrderHistoryPage
{
    constructor(page)
    {
        this.page = page;
        this.order = page.locator("button[routerlink*='myorders']");
        this.orderList = page.locator("tbody tr");
        this.ordernNum = page.locator('.col-text');
        this.details = page.locator("div div p.text");
        this.prodName = page.locator('.title');
    }
    
    async viewOrderList(orderID)
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

    async viewOrderDetails(orderID,username,countryName,productName)
    {
    //view order - assertions
    const orderDetails = await this.ordernNum.textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();
    const emailDetails = await this.details.first().textContent();
    expect(emailDetails.includes(username)).toBeTruthy();
    const countryDetails = await this.details.nth(1).textContent();
    expect(countryDetails.includes(countryName)).toBeTruthy();
    const emailDetails2 = await this.details.nth(2).textContent();
    expect(emailDetails2.includes(username)).toBeTruthy();
    const countryDetails2 = await this.details.last().textContent();
    expect(countryDetails2.includes(countryName)).toBeTruthy();
     const prodDetails = await this.prodName.textContent();
    expect(prodDetails.includes(productName)).toBeTruthy();
    }
}
module.exports = {OrderHistoryPage};