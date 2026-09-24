# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: MoreValidations.spec.js >>  @Web Popup Validations
- Location: tests/MoreValidations.spec.js:6:1

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#courses-iframe').contentFrame().locator('li a[href*="lifetime-access"]:visible')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - link:
      - /url: https://www.rahulshettyacademy.com/
      - img [ref=e3] [cursor=pointer]
    - link "🎯 I’ll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e4] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - generic [ref=e5]:
      - link [ref=e6] [cursor=pointer]:
        - /url: https://www.rahulshettyacademy.com/
        - button "Home" [ref=e7]
      - button "Practice" [ref=e8] [cursor=pointer]
      - button "Login" [ref=e9] [cursor=pointer]
      - button "Signup" [ref=e10] [cursor=pointer]
  - heading "Practice Page" [level=1] [ref=e11]
  - generic [ref=e12]:
    - group "Radio Button Example" [ref=e14]:
      - generic [ref=e16] [cursor=pointer]:
        - radio [ref=e17]
        - text: Radio1
      - generic [ref=e18] [cursor=pointer]:
        - radio [ref=e19]
        - text: Radio2
      - generic [ref=e20] [cursor=pointer]:
        - radio [ref=e21]
        - text: Radio3
    - group "Suggession Class Example" [ref=e23]:
      - textbox "Type to Select Countries" [ref=e25]
    - group "Dropdown Example" [ref=e27]:
      - combobox [ref=e29]:
        - option "Select" [selected]
        - option "Option1"
        - option "Option2"
        - option "Option3"
    - group "Checkbox Example" [ref=e31]:
      - generic [ref=e33] [cursor=pointer]:
        - checkbox [ref=e34]
        - text: Option1
      - generic [ref=e35] [cursor=pointer]:
        - checkbox [ref=e36]
        - text: Option2
      - generic [ref=e37] [cursor=pointer]:
        - checkbox [ref=e38]
        - text: Option3
  - generic [ref=e39]:
    - group "Switch Window Example" [ref=e41]:
      - button "Open Window" [ref=e43] [cursor=pointer]
    - group "Switch Tab Example" [ref=e45]:
      - link "Open Tab" [ref=e47] [cursor=pointer]:
        - /url: https://www.qaclickacademy.com
    - group "Switch To Alert Example" [ref=e49]:
      - textbox "Enter Your Name" [ref=e51]
      - button "Alert" [ref=e52] [cursor=pointer]
      - button "Confirm" [active] [ref=e53] [cursor=pointer]
  - generic [ref=e54]:
    - group "Web Table Example" [ref=e56]:
      - table [ref=e58]:
        - rowgroup [ref=e59]:
          - row [ref=e60]:
            - columnheader "Instructor" [ref=e61]
            - columnheader "Course" [ref=e62]
            - columnheader "Price" [ref=e63]
          - row [ref=e64]:
            - cell "Rahul Shetty" [ref=e65]
            - cell "Selenium Webdriver with Java Basics + Advanced + Interview Guide" [ref=e66]
            - cell "30" [ref=e67]
          - row [ref=e68]:
            - cell "Rahul Shetty" [ref=e69]
            - cell "Learn SQL in Practical + Database Testing from Scratch" [ref=e70]
            - cell "25" [ref=e71]
          - row [ref=e72]:
            - cell "Rahul Shetty" [ref=e73]
            - cell "Appium (Selenium) - Mobile Automation Testing from Scratch" [ref=e74]
            - cell "30" [ref=e75]
          - row [ref=e76]:
            - cell "Rahul Shetty" [ref=e77]
            - cell "WebSecurity Testing for Beginners-QA knowledge to next level" [ref=e78]
            - cell "20" [ref=e79]
          - row [ref=e80]:
            - cell "Rahul Shetty" [ref=e81]
            - cell "Learn JMETER from Scratch - (Performance + Load) Testing Tool" [ref=e82]
            - cell "25" [ref=e83]
          - row [ref=e84]:
            - cell "Rahul Shetty" [ref=e85]
            - cell "WebServices / REST API Testing with SoapUI" [ref=e86]
            - cell "35" [ref=e87]
          - row [ref=e88]:
            - cell "Rahul Shetty" [ref=e89]
            - cell "QA Expert Course :Software Testing + Bugzilla + SQL + Agile" [ref=e90]
            - cell "25" [ref=e91]
          - row [ref=e92]:
            - cell "Rahul Shetty" [ref=e93]
            - cell "Master Selenium Automation in simple Python Language" [ref=e94]
            - cell "25" [ref=e95]
          - row [ref=e96]:
            - cell "Rahul Shetty" [ref=e97]
            - cell "Advanced Selenium Framework Pageobject, TestNG, Maven, Jenkins,C" [ref=e98]
            - cell "20" [ref=e99]
          - row [ref=e100]:
            - cell "Rahul Shetty" [ref=e101]
            - cell "Write effective QA Resume that will turn to interview call" [ref=e102]
            - cell "0" [ref=e103]
    - generic [ref=e104]:
      - group "Element Displayed Example" [ref=e105]:
        - button "Hide" [ref=e107] [cursor=pointer]
        - button "Show" [ref=e108] [cursor=pointer]
      - group "Web Table Fixed header" [ref=e109]:
        - table [ref=e112]:
          - rowgroup [ref=e113]:
            - row [ref=e114]:
              - columnheader "Name" [ref=e115]
              - columnheader "Position" [ref=e116]
              - columnheader "City" [ref=e117]
              - columnheader "Amount" [ref=e118]
          - rowgroup [ref=e119]:
            - row [ref=e120]:
              - cell "Alex" [ref=e121]
              - cell "Engineer" [ref=e122]
              - cell "Chennai" [ref=e123]
              - cell "28" [ref=e124]
            - row [ref=e125]:
              - cell "Ben" [ref=e126]
              - cell "Mechanic" [ref=e127]
              - cell "Bengaluru" [ref=e128]
              - cell "23" [ref=e129]
            - row [ref=e130]:
              - cell "Dwayne" [ref=e131]
              - cell "Manager" [ref=e132]
              - cell "Kolkata" [ref=e133]
              - cell "48" [ref=e134]
            - row [ref=e135]:
              - cell "Ivory" [ref=e136]
              - cell "Receptionist" [ref=e137]
              - cell "Chennai" [ref=e138]
              - cell "18" [ref=e139]
            - row [ref=e140]:
              - cell "Jack" [ref=e141]
              - cell "Engineer" [ref=e142]
              - cell "Pune" [ref=e143]
              - cell "32" [ref=e144]
            - row [ref=e145]:
              - cell "Joe" [ref=e146]
              - cell "Postman" [ref=e147]
              - cell "Chennai" [ref=e148]
              - cell "46" [ref=e149]
            - row [ref=e150]:
              - cell "Raymond" [ref=e151]
              - cell "Businessman" [ref=e152]
              - cell "Mumbai" [ref=e153]
              - cell "37" [ref=e154]
            - row [ref=e155]:
              - cell "Ronaldo" [ref=e156]
              - cell "Sportsman" [ref=e157]
              - cell "Chennai" [ref=e158]
              - cell "31" [ref=e159]
            - row [ref=e160]:
              - cell "Smith" [ref=e161]
              - cell "Cricketer" [ref=e162]
              - cell "Delhi" [ref=e163]
              - cell "33" [ref=e164]
        - generic [ref=e165]: "Total Amount Collected: 296"
  - group "Mouse Hover Example" [ref=e168]:
    - generic [ref=e170]:
      - button "Mouse Hover" [ref=e171] [cursor=pointer]
      - generic [ref=e172]:
        - link "Top" [ref=e173] [cursor=pointer]:
          - /url: "#top"
        - link "Reload" [ref=e174] [cursor=pointer]:
          - /url: ""
  - group "iFrame Example" [ref=e176]:
    - iframe [ref=e178]
  - table [ref=e180]:
    - rowgroup [ref=e181]:
      - row [ref=e182]:
        - cell [ref=e183]:
          - list [ref=e184]:
            - listitem [ref=e185]:
              - heading [level=3] [ref=e186]:
                - link "Discount Coupons" [ref=e187] [cursor=pointer]:
                  - /url: "#"
            - listitem [ref=e188]:
              - link "REST API" [ref=e189] [cursor=pointer]:
                - /url: http://www.restapitutorial.com/
            - listitem [ref=e190]:
              - link "SoapUI" [ref=e191] [cursor=pointer]:
                - /url: https://www.soapui.org/
            - listitem [ref=e192]:
              - link "Appium" [ref=e193] [cursor=pointer]:
                - /url: https://courses.rahulshettyacademy.com/p/appium-tutorial
            - listitem [ref=e194]:
              - link "JMeter" [ref=e195] [cursor=pointer]:
                - /url: https://jmeter.apache.org/
        - cell [ref=e196]:
          - list [ref=e197]:
            - listitem [ref=e198]:
              - heading [level=3] [ref=e199]:
                - link "Latest News" [ref=e200] [cursor=pointer]:
                  - /url: "#"
            - listitem [ref=e201]:
              - link "Broken Link" [ref=e202] [cursor=pointer]:
                - /url: https://rahulshettyacademy.com/brokenlink
            - listitem [ref=e203]:
              - link "Dummy Content for Testing." [ref=e204] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e205]:
              - link "Dummy Content for Testing." [ref=e206] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e207]:
              - link "Dummy Content for Testing." [ref=e208] [cursor=pointer]:
                - /url: "#"
        - cell [ref=e209]:
          - list [ref=e210]:
            - listitem [ref=e211]:
              - heading [level=3] [ref=e212]:
                - link "Contact info" [ref=e213] [cursor=pointer]:
                  - /url: "#"
            - listitem [ref=e214]:
              - link "Dummy Content for Testing." [ref=e215] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e216]:
              - link "Dummy Content for Testing." [ref=e217] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e218]:
              - link "Dummy Content for Testing." [ref=e219] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e220]:
              - link "Dummy Content for Testing." [ref=e221] [cursor=pointer]:
                - /url: "#"
        - cell [ref=e222]:
          - list [ref=e223]:
            - listitem [ref=e224]:
              - heading [level=3] [ref=e225]:
                - link "Social Media" [ref=e226] [cursor=pointer]:
                  - /url: "#"
            - listitem [ref=e227]:
              - link "Facebook" [ref=e228] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e229]:
              - link "Twitter" [ref=e230] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e231]:
              - link "Google+" [ref=e232] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e233]:
              - link "Youtube" [ref=e234] [cursor=pointer]:
                - /url: "#"
  - generic [ref=e235]:
    - text: © 2019 Powered by
    - strong [ref=e236]:
      - link "Medianh Consulting" [ref=e237] [cursor=pointer]:
        - /url: http://www.medianhconsulting.com
  - status [ref=e238]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { Agent } = require('node:http');
  3  | 
  4  | //test.describe.configure({ mode: 'parallel' }); //run tests in parallel
  5  | //test.describe.configure({ mode: 'serial' }); //runs tests in order
  6  | test(" @Web Popup Validations", async ({ page }) => {
  7  |         await page.goto(
  8  |                 "https://rahulshettyacademy.com/AutomationPractice/",
  9  |                 { waitUntil: 'domcontentloaded', timeout: 60000 }
  10 |         );
  11 |         await expect(page.locator('#displayed-text')).toBeVisible();
  12 |         await page.locator('#hide-textbox').click();
  13 |         await expect(page.locator('#displayed-text')).toBeHidden();
  14 | 
  15 |         //broswer modals
  16 |         await page.locator('#confirmbtn').click();
  17 |         await page.on('dialog', dialog => dialog.accept());
  18 |         await page.locator('#confirmbtn').click();
  19 |         await page.on('dialog', dialog => dialog.dismiss());
  20 | 
  21 |         //hover
  22 |         await page.locator('#mousehover').hover();
  23 | 
  24 |         //frames
  25 |         const framesPage = page.frameLocator('#courses-iframe');
> 26 |         await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
     |                                                                           ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  27 |         const textCheck = await framesPage.locator('.text h2').textContent();
  28 |         console.log(textCheck.split(' ')[1]); //split the text and get the second word
  29 | 
  30 | });
  31 | 
  32 | 
  33 | test("Screenshot comparison", async ({ page }) => {
  34 |         await page.goto(
  35 |                 "https://rahulshettyacademy.com/AutomationPractice/",
  36 |                 { waitUntil: 'domcontentloaded', timeout: 60000 }
  37 |         );
  38 |         await expect(page.locator('#displayed-text')).toBeVisible();
  39 |         await page.locator('#displayed-text').screenshot({ path: 'partialScreenshot.png' }); // specific element
  40 |         await page.locator('#hide-textbox').click();
  41 |         await page.screenshot({ path: 'screenshot.png' }); // whole page
  42 |         await expect(page.locator('#displayed-text')).toBeHidden();
  43 | 
  44 | });
  45 | //screenshot -> store -> screenswhot
  46 | 
  47 | test("Visual comparison", async ({ page }) => {
  48 |         await page.goto("https://www.google.com/");
  49 |         const logo = page.locator("[aria-label='Google']");
  50 |         // Ensure the element is fully rendered
  51 |         await expect(logo).toBeVisible({ timeout: 10000 });
  52 | 
  53 |         // Take a stable screenshot
  54 |         const screenshot = await logo.screenshot({ animations: 'disabled' });
  55 | 
  56 |         await expect(screenshot).toMatchSnapshot('landing.png');
  57 | 
  58 | });
```