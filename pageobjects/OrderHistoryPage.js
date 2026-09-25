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
        await this.page.locator("tbody").waitFor();

        const rows = this.orderList;
        const totalRows = await rows.count();

        for (let i = 0; i < totalRows; i++)
        {
            const rowOrderId = (await rows.nth(i).locator("th").textContent())?.trim();

            if (rowOrderId && String(orderID).includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                return;
            }
        }

        throw new Error(`Order ID ${orderID} was not found in the order history list.`);
    }

    async viewOrderDetails(orderID, username, countryName, productName)
    {
        const orderDetails = (await this.ordernNum.textContent())?.trim();
        expect(String(orderID)).toContain(orderDetails ?? '');

        const emailDetails = (await this.details.first().textContent())?.trim();
        expect(emailDetails ?? '').toContain(username);

        const countryDetails = (await this.details.nth(1).textContent())?.trim();
        expect(countryDetails ?? '').toContain(countryName);

        const emailDetails2 = (await this.details.nth(2).textContent())?.trim();
        expect(emailDetails2 ?? '').toContain(username);

        const countryDetails2 = (await this.details.last().textContent())?.trim();
        expect(countryDetails2 ?? '').toContain(countryName);

        const prodDetails = (await this.prodName.textContent())?.trim();
        expect(prodDetails ?? '').toContain(productName);
    }
}
module.exports = {OrderHistoryPage};