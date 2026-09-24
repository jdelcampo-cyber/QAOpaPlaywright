// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',   // points to the whole tests folder
  testMatch: '**/*.spec.js',
  retries: 1, //test failures will be retried
  workers: 3, //setting number of worjers to test files 
  timeout: 50 * 1000,
  expect: {
    timeout: 8000,
  },
  reporter: 'html',
  projects: [   // allowa cross-browser testing 
    {
      name: "Safari", //cudtom configurations in multiple projects
      use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        browserName: 'webkit',
        headless: false,
        trace: 'on', //off.om,retain-on-failure
        screenshot: 'off',
       // ...devices['iPhone 11'], //test mobile or web devices
        },
    },
    {
      name: "Chrome", //cudtom configurations in multiple projects
      use: {
        actionTimeout: 30 * 1000,
        navigationTimeout: 50 * 1000,
        browserName: 'chromium',
        headless: false,
        video: 'retain-on-failure', //record videos during test failures
       // ignoreHttpsError: true, //tcheck SSL certifcations
       // permissions: ['geolocation'], //check popup locations 
        trace: 'on', //off.om,retain-on-failure
        screenshot: 'on',
        //  ...devices[''], //test mobile or web devices
       // viewport: {width:720,height:720} //test screen responsiveness
      },
    }
   ]
};
module.exports = config;


