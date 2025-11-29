import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },


 
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['line'],
  ],

  /* Папка с артефактами (скриншоты, видео, логи) */
  outputDir: 'test-results',

  /* Скриншоты и видео только при падении */
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Проекты: браузеры, устройства */
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
});
