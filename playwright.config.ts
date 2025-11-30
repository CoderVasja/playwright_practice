import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

//find the correct env file based on NODE_ENV variable
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });


export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },



  reporter: [
    ["line"],
    ["allure-playwright"]
  ],

  
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },





  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
