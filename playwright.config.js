// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',   // points to the whole tests folder
 //testMatch: '**/*.spec.{js,ts}',
  retries: 2,
  timeout: 50 * 1000,
  expect: {
    timeout: 8000,
  },
  reporter: 'html',
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    browserName: 'chromium',
    headless: true,
    trace: 'on', //off.om,retain-on-failure
    screenshot: 'on',
  },
};
module.exports = config;


