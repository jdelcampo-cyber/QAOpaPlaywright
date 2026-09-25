import { test as base, expect } from '@playwright/test';
import { execSync } from 'node:child_process';
import { count, group } from 'node:console';
const { Agent } = require('node:http');

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
    await expect(festival.first()).toBeVisible();
    await expect(concert.first()).toBeVisible();
    await expect(conferemce.first()).toBeVisible();
    await expect(featured.first()).toBeVisible();
    await use(page);
  },
});

async function BookingPage(page) {
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
  const cancelBtn = page.locator('button.text-gray-700');
  const modal = page.locator('#modal-title');
  const deleteBtn = page.locator('#confirm-dialog-yes');
  const viewBtn = page.locator('button:has-text("View Details")');
  const BackBtn = page.locator('button.text-gray-700');
  const ticketDetails = page.locator('.p-6');
  const toasterMsg = page.locator('.bg-emerald-50');
  const cancelBook = page.locator('#cancel-booking-btn');

  //booking details
 // await expect(bookingPage.first()).toBeVisible();
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

  //await about.textContent();

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
      await Promise.all([
        page.waitForLoadState('networkidle'),
        tiles.nth(i).locator('a:has-text("View Details")').click()
      ]);
      break;
    }
  }
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
  //go back tp list
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.getByTestId('nav-bookings').click()
  ]);

  await expect(page.locator('h1')).toContainText('My Bookings');
  await page.waitForLoadState('networkidle');

  //delete booking
  await cancelBook.first().click();
  await expect(modal).toBeVisible();
  await cancelBtn.last().click();
  await page.waitForLoadState('networkidle');
  await cancelBook.first().click();
  await expect(modal).toBeVisible();
  await deleteBtn.click();

  //verify deleted booking
  await expect(page.locator(`.booking-ref:has-text("${bookingRefValue}")`)).toHaveCount(0);

  // const rows2 = await lists;
  // await expect(rows2).toHaveCount(0);
}

async function EventPage(page) {
  const newEvent = page.locator('h2.mb-2');
  const eventMsg = page.locator('.mb-5');
  const addBtn = page.getByRole("button", { name: '+ Add Event' });
  const editBtn = page.getByRole("button", { name: '💾 Update Event' });
  const title = page.getByPlaceholder("Event title");
  const desc = page.getByPlaceholder("Describe the event…");
  const category = page.getByLabel('Category');
  const city = page.getByPlaceholder("e.g. Bangalore");
  const venue = page.getByPlaceholder("Venue name & address");
  const datetime = page.getByRole('textbox', { name: 'Event Date & Time*' });
  const price = page.getByPlaceholder("0.00");
  const seats = page.getByPlaceholder("e.g. 500");
  const image = page.getByPlaceholder("https://…");
  const tables = page.locator('.overflow-hidden');
  const toasterMsg = page.locator('.text-emerald-800');
  const sports = page.locator('span.ring-emerald-200');

  // check New Events page
  await expect(newEvent).toBeVisible();
  await expect(eventMsg).toBeVisible();

  //error messages
  await addBtn.click();
  await expect(page.getByText('Title is required')).toBeVisible();
  await expect(page.getByText('City is required')).toBeVisible();
  await expect(page.getByText('Venue is required')).toBeVisible();
  await expect(page.getByText('Event date is required')).toBeVisible();
  await expect(page.getByText('Enter a valid price (≥ 0)')).toBeVisible();
  await expect(page.getByText('Must have at least 1 seat')).toBeVisible();

  await title.fill("FIFA World Cup");
  await desc.fill("The FIFA World Cup, often called the World Cup, is an international association football competition among the senior men's national teams of the members of the Fédération Internationale de Football Association (FIFA)");
  await category.selectOption('Sports');
  await city.fill("Tokyo");
  await venue.fill("Shinkansen Stadium Tokyo");

  await datetime.fill('2020-01-22T11:39');
  await addBtn.click();
  await expect(page.getByText('Must be a future date')).toBeVisible();
  await datetime.fill('2027-01-22T11:39');
  await price.fill('0');
  await addBtn.click();
  await price.fill('120');
  await seats.fill('0');
  await addBtn.click();
  await expect(page.getByText('Must have at least 1 seat')).toBeVisible();
  await seats.fill('5');

  await image.fill("https://tse4.mm.bing.net/th/id/OIP.s72rTmr-7ZaBI3H_STAzSQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3");

  // all events section
  const headers = tables;
  const rows = headers.locator('#event-table-row');
  const rowCounts = await rows.count();
  for (let i = 0; i < rowCounts; i++) {
    const row = rows.nth(i);
    const cells = row.locator('.px-4');
    const cellCount = await cells.count();

    for (let j = 0; j < cellCount; j++) {
      const cell = cells.nth(j);
      await expect(cell).toBeVisible();
      const cellText = await cell.innerText();
      console.log(`Row ${i}, Cell ${j}: ${cellText}`);
    }
  }

  await addBtn.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(toasterMsg).toContainText('Event');

  // checking the added events
  await expect(sports.first()).toBeVisible();

  //edit added event
  const group = await sports.first().textContent();
  if (group.includes("Sports")) {
    await page.locator("#edit-event-btn").first().click();
    await title.fill("FIFA World Cup Newer Go");
    await editBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(toasterMsg).toContainText('Event');
  }

  //check updated event
  for (let i = 0; i < rowCounts; i++) {
    const row = rows.nth(i);
    const cells = row.locator('.px-4');
    const cellCount = await cells.count();

    for (let j = 0; j < cellCount; j++) {
      const cell = cells.nth(j);
      await expect(cell).toBeVisible();
      const cellText = await cell.innerText();
      console.log(`Row ${i}, Cell ${j}: ${cellText}`);
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

test('Eventhub Booking creation test', async ({ URLpage, loggedInPage, Homepage, page }) => {
  await URLpage;
  await loggedInPage;
  await Homepage;

  //delete booking
  const clear = page.getByRole('button', { name: 'Clear all bookings' });
  const eventsList = page.locator('#event-card');
  const home = page.getByTestId('nav-home');
  const lists = page.locator('#booking-card');
  const bookings = page.getByTestId('nav-bookings');

  const title = await eventsList;
  for (let i = 0; i < await title.count(); ++i) {
    const event = await title.nth(i).locator("h3").textContent();
    const add = await title.nth(i).locator("#book-now-btn").textContent();
    if (event.includes("World Tech Summit") && add.includes("Book Now")) {
      //  await title.nth(i).locator('.text-amber-600').textContent();
      await title.nth(i).locator("#book-now-btn").click();
      break;
    }
  }

  await BookingPage(page);

  //view updated event
  await home.click();

  const updates = await eventsList;
  for (let i = 0; i < await updates.count(); ++i) {
    const newEvent = await updates.nth(i).locator("h3").textContent();
    const newAdd = await updates.nth(i).locator("#book-now-btn").textContent();
    if (newEvent.includes("World Tech Summit") && newAdd.includes("Book Now")) {
  //    await updates.nth(i).locator('.text-amber-600').textContent();
      break;
    }
  }

  //cancel bookings
  await bookings.click();
  await clear.click();

  //display browser modal
  await page.waitForLoadState('domcontentloaded');
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });

 //await expect(lists).toHaveCount(0);

});

test('Eventhub Admin Booking creation test', async ({ URLpage, loggedInPage, page }) => {
  await URLpage;
  await loggedInPage;

  const admin = page.locator('button.px-4');
  const events = page.locator("[href='/admin/events']");
  const toasterMsg = page.locator('.text-emerald-800');
  const cancel = page.locator('button.text-gray-700');
  const modal = page.locator('p.text-gray-600');
  const deleteBtn = page.locator('#confirm-dialog-yes');
  const home = page.getByTestId('nav-home');
  const eventsList = page.locator('#event-card');
  const tables = page.locator('.overflow-hidden');

  await admin.click();
  await events.first().click();

  await page.waitForLoadState('domcontentloaded');
  await EventPage(page);

  await home.click();
  await page.waitForLoadState('networkidle');
  //await expect(page.locator("h3:has-text('FIFA World Cup Newer Go')")).toBeVisible();

  const title = await eventsList;
  for (let i = 0; i < await title.count(); ++i) {
    const event = await title.nth(i).locator("h3").textContent();
    const add = await title.nth(i).locator("#book-now-btn").textContent();
    if (event.includes("FIFA World Cup New") && add.includes("Book Now")) {
      await title.nth(i).locator('.text-amber-600').textContent();
      await title.nth(i).locator("#book-now-btn").click();
      break;
    }
  }

  await BookingPage(page);

  await home.click();
  await page.waitForLoadState('networkidle');
  //await expect(page.locator("h3:has-text('FIFA World Cup Newer Go')")).toBeVisible();

  const updates = eventsList;
  for (let i = 0; i < await updates.count(); ++i) {
    const newEvent = await updates.nth(i).locator("h3").textContent();
    const newAdd = await updates.nth(i).locator("#book-now-btn").textContent();
    if (newEvent.includes("FIFA World Cup Newer Go") && newAdd.includes("Book Now")) {
      await updates.nth(i).locator('.text-amber-600').textContent();
      break;
    }
  }

  await admin.click();
  await events.first().click();

  //delete added event
  const groups = await page.locator('.bg-emerald-100').last().textContent();
  if (groups.includes("Sports")) {
    await page.locator("#delete-event-btn").first().click();
    await cancel.first().click();
    await page.locator("#delete-event-btn").first().click();
    await deleteBtn.last().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(toasterMsg).toContainText('Event');
  }

  //check deleted event
  const headers = tables;
  const rows = headers.locator('#event-table-row');
  const rowCounts = await rows.count();
  for (let i = 0; i < rowCounts; i++) {
    const row = rows.nth(i);
    const cells = row.locator('.px-4');
    const cellCount = await cells.count();

    for (let j = 0; j < cellCount; j++) {
      const cell = cells.nth(j);
      await expect(cell).toBeVisible();
      const cellText = await cell.innerText();
      console.log(`Row ${i}, Cell ${j}: ${cellText}`);

    }
  }
});


