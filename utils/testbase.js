const base = require('@playwright/test');

exports.newcustomtest = base.test.extend({
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
