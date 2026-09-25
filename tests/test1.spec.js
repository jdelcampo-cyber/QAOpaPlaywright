const { test, expect } = require('@playwright/test');
const { OrderHistoryPage } = require('../pageobjects/OrderHistoryPage');
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test('Make HTTP GET request using Playwright', async ({ page, request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Response body:', body);

  expect(body).toHaveProperty('id', 1);

  const orderHistoryPage = new OrderHistoryPage(page);
  console.log(orderHistoryPage);

  for (const data of dataSet) {
    console.log('Loaded dataset item:', data.productName, data.username);
  }
});
