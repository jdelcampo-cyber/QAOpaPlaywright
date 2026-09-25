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

    async viewOrderDetails(orderID:any,username:string,countryName:string,productName:string)
    {
        const orderDetails: string | null = (await this.ordernNum.textContent())?.trim() ?? null;
        expect(String(orderID)).toContain(orderDetails ?? '');

        const emailDetails: string | null = (await this.details.first().textContent())?.trim() ?? null;
        expect(emailDetails ?? '').toContain(username);

        const countryDetails: string | null = (await this.details.nth(1).textContent())?.trim() ?? null;
        expect(countryDetails ?? '').toContain(countryName);

        const emailDetails2: string | null = (await this.details.nth(2).textContent())?.trim() ?? null;
        expect(emailDetails2 ?? '').toContain(username);

        const countryDetails2: string | null = (await this.details.last().textContent())?.trim() ?? null;
        expect(countryDetails2 ?? '').toContain(countryName);

        const prodDetails: string | null = (await this.prodName.textContent())?.trim() ?? null;
        expect(prodDetails ?? '').toContain(productName);
    }
}
module.exports = {OrderHistoryPage};