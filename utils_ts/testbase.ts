import {test as baseTest} from '@playwright/test';

interface TestDateOrder {
        username : string;
        password : string;
        productName : string;
        cardNumber : string;
        monthdate : string;
        daydate : string;
        cardexpiry : string;
        cardHolder : string;
        couponcode : string;
};

export const newcustomtest = baseTest.extend<{testDateOrder:TestDateOrder}>({
    testDateOrder: {
        username : "junny@gmail.com",
        password : "Learn@123",
        productName : "ZARA COAT 3",
        cardNumber : "4423772671013078",
        monthdate : "11",
        daydate : "24",
        cardexpiry : "345",
        cardHolder : "Jun del Campo",
        couponcode : "rahulshettyacademy"
    }
});
