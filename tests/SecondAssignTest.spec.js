import { test as base, expect } from '@playwright/test';
import { execSync } from 'node:child_process';
import { count, group } from 'node:console';

const test = base.extend({
  URLpage: async ({ page }, use) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await use(page);
  },
  loggedInPage: async ({ page }, use) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('junny@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Learn@123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await use(page);
  },
  Homepage: async ({ page }, use) => {
    const festival = page.locator('.bg-red-100');
    const concert = page.locator('.bg-amber-100');
    const conferemce = page.locator('.bg-indigo-100');
    const featured = page.locator('.bg-emerald-500');
    //booking list
   // await expect(festival.first()).toBeVisible();
    await expect(concert.first()).toBeVisible();
    await expect(conferemce.first()).toBeVisible();
    await expect(featured.first()).toBeVisible();
    await use(page);
  },
});

async function SingleBookingPage(page) {
  const festival = page.locator('.bg-red-100');
  const concert = page.locator('.bg-amber-100');
  const conferemce = page.locator('.bg-indigo-100');
  const sports = page.locator('.bg-emerald-100');
  const workshop = page.locator('.bg-blue-100');
  const featured = page.locator('.bg-emerald-500');
  const featuredSmall = page.locator('.bg-emerald-100');
  const featuredMsg = page.locator('.py-3');
  const bookingPage = page.locator('nav.gap-2');
  const details = page.locator('.text-gray-800');
  const about = page.locator('.whitespace-pre-wrap');
  const ticketPrice = page.locator('.flex .text-2xl');
  const addBtn = page.getByRole("button", { name: '+' });
  const subBtn = page.getByRole("button", { name: '−' });
  const ticketCount = page.locator('#ticket-count');
  const total = page.locator('.border-indigo-100');
  const name = page.getByRole('textbox', { name: 'Full Name*' });
  const phone = page.getByRole('textbox', { name: 'Phone Number*' });
  const confirmBtn = page.getByRole('button', { name: 'Confirm Booking' });
  const eventsList = page.locator('#event-card');
  const seats = page.locator('.text-amber-600');
  const confirm = page.locator('.text-xl');
  const ref = page.locator('.booking-ref');
  const view = page.getByRole('button', { name: 'View My Bookings' });
  const BookBtn = page.locator('#book-now-btn');
  const home = page.getByTestId('nav-home');
  const bookings = page.getByTestId('nav-bookings');
  const lists = page.locator('#booking-card');
  const confirmed = page.locator('.ring-emerald-200');
  const bookId = page.locator('#booking-id');
  const ticket = page.locator('.text-indigo-700');
  const event = page.locator('h3');
  const bookDetails = page.locator('.gap-x-4');
  const cancel = page.getByRole("button", { name: 'Cancel Booking' });
  const viewBtn = page.locator('button:has-text("View Details")');
  const ticketDetails = page.locator('.p-6');
  const toasterMsg = page.locator('.bg-emerald-50');
  const cancelBtn = page.locator('button.text-gray-700');

  //booking details
  await expect(bookingPage.first()).toBeVisible();
  if (await festival.isVisible()) {
    await expect(festival).toBeVisible();
  }
  else if (await concert.isVisible()) {
    await expect(concert).toBeVisible();
  }
  else if (await conferemce.isVisible()) {
    await expect(conferemce).toBeVisible();
  }
  else if (await sports.isVisible()) {
    await expect(sports).toBeVisible();
  }
  else {
    await expect(workshop).toBeVisible();
  }
  /*
   if(await featuredSmall.isVisible())
    {
      await expect(featuredSmall).toBeVisible(); 
      await expect(featuredMsg).toBeVisible();
    }
  */
  const rows = await details.count();
  for (let i = 0; i < await rows; ++i) {
    await details.nth(i).textContent();
  }

  await about.textContent();

  //ticket detils
  await ticketPrice.textContent();
  await addBtn.click();
  await ticketCount.textContent();
  await total.textContent();
  await subBtn.click();
  await ticketCount.textContent();
  await total.textContent();

  await confirmBtn.click();

  await expect(page.getByText('Name must be at least 2 chars')).toBeVisible();
  await expect(page.getByText('Enter a valid email')).toBeVisible();
  await expect(page.getByText('Enter a valid 10-digit phone')).toBeVisible();

  await name.fill('r');
  await confirmBtn.click();
  await name.fill('rsrst');
  await page.getByTestId('customer-email').fill('junn@gmail.com');
  await phone.fill('4345');
  await confirmBtn.click();
  await phone.fill('4356354647');
  await confirmBtn.click();

  //confirmation
  await confirm.textContent();
  const bookingRefConfirmation = await ref.innerText();
  const bookingRefValue = bookingRefConfirmation.replace('Booking Ref:', '').trim();
  await view.click();

  //view updated event
  await home.click();
  const titles = await eventsList;
  for (let i = 0; i < await titles.count(); ++i) {
    const events = await titles.nth(i).locator("h3").textContent();
    const adds = await titles.nth(i).locator("#book-now-btn").textContent();
    if (events.includes("World Tech Summit") || events.includes("FIFA World Cup New")) {
    //  await titles.nth(i).locator('.text-amber-600').textContent();
      break;
    }
  }

  //my bookings
  await bookings.click();

  await expect(page.locator('h1')).toContainText('My Bookings');
  await page.waitForLoadState('networkidle');

  //select booking
  const tiles = await lists;
  for (let i = 0; i < await tiles.count(); ++i) {
    const bookingRefOnList = await tiles.nth(i).locator('.booking-ref').innerText();
    if (bookingRefOnList.includes(bookingRefValue)) {
      await expect(confirmed.nth(i)).toBeVisible();
      await expect(bookId.nth(i)).toBeVisible();
      await expect(ticket.nth(i)).toBeVisible();
      await expect(bookDetails.nth(i)).toBeVisible();
      await page.waitForLoadState('networkidle');
     await Promise.all([
        page.waitForLoadState('networkidle'),
        tiles.nth(i).locator('a:has-text("View Details")').click()
      ]);
      break;
    }
  }
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.bg-indigo-50').last()).toBeVisible();
  await expect(confirmed.first()).toBeVisible();
  await expect(cancelBtn.first()).toBeVisible();

  const lines = await ticketDetails;
  const rowCount = await lines.count();
  const expectedData = [];
  // Loop through each row and assert its contents
  for (let i = 0; i < await rowCount; i++) {
    const row = lines.nth(i);
    const cells = row.locator('.space-y-3 .gap-4');
    const cellCount = await cells.count();
    const rowData = [];

    for (let j = 0; j < await cellCount; j++) {
      const cell = cells.nth(j);
      await expect(cell).toBeVisible();
      const cellText = await cell.innerText();
    }
  }
}

async function MultipleBookingPage(page) {
  const festival = page.locator('.bg-red-100');
  const concert = page.locator('.bg-amber-100');
  const conferemce = page.locator('.bg-indigo-100');
  const sports = page.locator('.bg-emerald-100');
  const workshop = page.locator('.bg-blue-100');
  const featured = page.locator('.bg-emerald-500');
  const featuredSmall = page.locator('.bg-emerald-100');
  const featuredMsg = page.locator('.py-3');
  const bookingPage = page.locator('nav.gap-2');
  const details = page.locator('.text-gray-800');
  const about = page.locator('.whitespace-pre-wrap');
  const ticketPrice = page.locator('.flex .text-2xl');
  const addBtn = page.getByRole("button", { name: '+' });
  const subBtn = page.getByRole("button", { name: '−' });
  const ticketCount = page.locator('#ticket-count');
  const total = page.locator('.border-indigo-100');
  const name = page.getByRole('textbox', { name: 'Full Name*' });
  const phone = page.getByRole('textbox', { name: 'Phone Number*' });
  const confirmBtn = page.getByRole('button', { name: 'Confirm Booking' });
  const eventsList = page.locator('#event-card');
  const seats = page.locator('.text-amber-600');
  const confirm = page.locator('.text-xl');
  const ref = page.locator('.booking-ref');
  const view = page.getByRole('button', { name: 'View My Bookings' });
  const BookBtn = page.locator('#book-now-btn');
  const home = page.getByTestId('nav-home');
  const bookings = page.getByTestId('nav-bookings');
  const lists = page.locator('#booking-card');
  const confirmed = page.locator('.ring-emerald-200');
  const bookId = page.locator('#booking-id');
  const ticket = page.locator('.text-indigo-700');
  const event = page.locator('h3');
  const bookDetails = page.locator('.gap-x-4');
  const cancel = page.getByRole("button", { name: 'Cancel Booking' });
  const viewBtn = page.locator('button:has-text("View Details")');
  const ticketDetails = page.locator('.p-6');
  const toasterMsg = page.locator('.bg-emerald-50');
  const cancelBtn = page.locator('button.text-gray-700');

  //booking details
  await expect(bookingPage.first()).toBeVisible();
  if (await festival.isVisible()) {
    await expect(festival).toBeVisible();
  }
  else if (await concert.isVisible()) {
    await expect(concert).toBeVisible();
  }
  else if (await conferemce.isVisible()) {
    await expect(conferemce).toBeVisible();
  }
  else if (await sports.isVisible()) {
    await expect(sports).toBeVisible();
  }
  else {
    await expect(workshop).toBeVisible();
  }
  /*
   if(await featuredSmall.isVisible())
    {
      await expect(featuredSmall).toBeVisible(); 
      await expect(featuredMsg).toBeVisible();
    }
  */
  const rows = await details.count();
  for (let i = 0; i < await rows; ++i) {
    await details.nth(i).textContent();
  }

  await about.textContent();

  //ticket detils
  await ticketPrice.textContent();
  await addBtn.click();
  await ticketCount.textContent();
  await total.textContent();
  await page.waitForLoadState('networkidle');
  await addBtn.click();
  await ticketCount.textContent();
  await total.textContent();
 await page.waitForLoadState('networkidle');
  await addBtn.click();
  await ticketCount.textContent();
  await total.textContent();

  await confirmBtn.click();

  await expect(page.getByText('Name must be at least 2 chars')).toBeVisible();
  await expect(page.getByText('Enter a valid email')).toBeVisible();
  await expect(page.getByText('Enter a valid 10-digit phone')).toBeVisible();

  await name.fill('r');
  await confirmBtn.click();
  await name.fill('rsrst');
  await page.getByTestId('customer-email').fill('junn@gmail.com');
  await phone.fill('4345');
  await confirmBtn.click();
  await phone.fill('4356354647');
  await confirmBtn.click();

  //confirmation
  await confirm.textContent();
  //const bookingRefConfirmations = await ref.innerText();
  //const bookingRefValues = bookingRefConfirmations.replace('Booking Ref:', '').trim();
  const bookingCodeText = await ref.innerText();
  const bookingCode = bookingCodeText.trim(); 
  console.log(`Captured booking code: ${bookingCode}`);
  await view.click();

  //view updated event
  await home.click();
  const titles = await eventsList;
  for (let i = 0; i < await titles.count(); ++i) {
    const events = await titles.nth(i).locator("h3").textContent();
    const adds = await titles.nth(i).locator("#book-now-btn").textContent();
    if (events.includes("World Tech Summit") || events.includes("FIFA World Cup New")) {
  //    await titles.nth(i).locator('.text-amber-600').textContent();
      break;
    }
  }

  //my bookings
  await bookings.click();

  await expect(page.locator('h1')).toContainText('My Bookings');
  await page.waitForLoadState('networkidle');

  //select booking  s     
   const targetBooking = page.locator('#booking-card').filter({ hasText: bookingCode });
  await targetBooking.locator('button:has-text("View Details")').click();
  
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.bg-indigo-50').last()).toBeVisible();
  await expect(confirmed.first()).toBeVisible();
  await expect(cancelBtn.first()).toBeVisible();

  const lines = await ticketDetails;
  const rowCount = await lines.count();
  const expectedData = [];
  // Loop through each row and assert its contents
  for (let i = 0; i < await rowCount; i++) {
    const row = lines.nth(i);
    const cells = row.locator('.space-y-3 .gap-4');
    const cellCount = await cells.count();
    const rowData = [];

    for (let j = 0; j < await cellCount; j++) {
      const cell = cells.nth(j);
      await expect(cell).toBeVisible();
      const cellText = await cell.innerText();
    }
  }
}

test('Eventhub Registration test', async ({ URLpage, page }) => {
  await URLpage;

  const regBtn = page.getByTestId('register-btn');
  const email = page.getByTestId('register-email');
  const confirmPass = page.getByRole('textbox', { name: 'Repeat your password' });

  //register
  await expect(page.locator('body')).toContainText('Don\'t have an account? Register');
  await page.getByRole('link', { name: 'Register' }).click();
  await regBtn.click();
  await expect(page.getByText('Enter a valid email')).toBeVisible();
  await expect(page.getByText('Password does not meet the requirements below')).toBeVisible();
  await confirmPass.fill('sdfas');
  await regBtn.click();
  await expect(page.getByText('Passwords do not match')).toBeVisible();
  await email.fill('junny@gmail.com');
  await page.getByTestId('register-password').fill('Learn@123');
  await confirmPass.fill('Learn@123');
  await regBtn.click();
  await expect(page.getByText('Email already registered')).toBeVisible();
  await email.fill('junny2@gmail.com');
  await regBtn.click();
});

test('Eventhub Login test', async ({ URLpage, page }) => {
  await URLpage;

  const signIn = page.getByRole('button', { name: 'Sign In' });

  //home page
  await expect(page.locator('body')).toContainText('The #1 QA Practice Hubfor Automation Engineers');
  await expect(page.locator('body')).toContainText('EventHub is a production-grade practice app designed so you can sharpen your testing skills on real-world scenarios — before your next interview or project.');

  //API page
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'API Documentation (Swagger)' }).click();
  const page1 = await page1Promise;

  //login page
  await signIn.click();
  await expect(page.getByText('Enter a valid email')).toBeVisible();
  await expect(page.getByText('Password must be at least 6')).toBeVisible();
  await page.getByRole('textbox', { name: 'Email' }).fill('junny@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Learn@123');
  await signIn.click();
});

test('Eventhub Booking refund creation test', async ({ URLpage, loggedInPage, Homepage, page }) => {
  await URLpage;
  await loggedInPage;
  await Homepage;

  //delete booking
  const clear = page.getByRole('button', { name: 'Clear all bookings' });
  const eventsList = page.locator('#event-card');
  const home = page.getByTestId('nav-home');
  const lists = page.locator('#booking-card');
  const bookings = page.getByTestId('nav-bookings');
  const refund = page.locator('#check-refund-btn');
  const refundResult = page.locator('#refund-result');
  const spinner = page.locator('#refund-spinner');
  const BackBtn = page.locator('button.text-gray-700');

  const title = await eventsList;
  for (let i = 0; i < await title.count(); ++i) {
    const event = await title.nth(i).locator("h3").textContent();
    const add = await title.nth(i).locator("#book-now-btn").textContent();
    if (event.includes("World Tech Summit") && add.includes("Book Now")) {
   //   await title.nth(i).locator('.text-amber-600').textContent();
      await title.nth(i).locator("#book-now-btn").click();
      break;
    }
  }

  await SingleBookingPage(page);

  //check eligibility for refund
  await refund.click();
  await expect(spinner).toBeVisible();
  await expect(refundResult).toContainText('Eligible for refund.');

  //view updated event
  await home.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator("h3:has-text('World Tech Summit')")).toBeVisible();
  
  const updates = await eventsList;
  for (let i = 0; i < await updates.count(); ++i) {
    const newEvent = await updates.nth(i).locator("h3").textContent();
    const newAdd = await updates.nth(i).locator("#book-now-btn").textContent();
    if (newEvent.includes("World Tech Summit") && newAdd.includes("Book Now")) {
   //   await updates.nth(i).locator('.text-amber-600').textContent();
      await updates.nth(i).locator("#book-now-btn").click();
      break;
    }
  }

  await page.waitForLoadState('domcontentloaded');
  await MultipleBookingPage(page);
 
  //check eligibility for refund
  await refund.click();
  await expect(spinner).toBeVisible();
  await expect(refundResult).toContainText('Not eligible for refund.');

  //view updated event
  await home.click();
  await page.waitForLoadState('networkidle');
   await expect(page.locator("h3:has-text('World Tech Summit')")).toBeVisible();
  
  const latest = await eventsList;
  for (let i = 0; i < await latest.count(); ++i) {
    const newEvent = await latest.nth(i).locator("h3").textContent();
    const newAdd = await latest.nth(i).locator("#book-now-btn").textContent();
    if (newEvent.includes("World Tech Summit") && newAdd.includes("Book Now")) {
    //  await latest.nth(i).locator('.text-amber-600').textContent();
      await latest.nth(i).locator("#book-now-btn").click();
      break;
    }
  }

});


