import {LoginPage} from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { OrderReviewPage } from './OrderReviewPage';
import { OrderHistoryPage } from './OrderHistoryPage';
import { Page } from '@playwright/test';

export class POManager
{
    page: Page;
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    orderReviewPage:OrderReviewPage;
    orderHistoryPage:OrderHistoryPage;

    constructor(page:Page)
    {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.orderReviewPage = new OrderReviewPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }
    
    getCartPage()
    {
        return this.cartPage;
    }

    getOrderReviewPage()
    {
        return this.orderReviewPage;
    }

    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }
}
module.exports = {POManager};