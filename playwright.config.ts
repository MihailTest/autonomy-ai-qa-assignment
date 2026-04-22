import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 120000,
    expect: {
        timeout: 15000,
    },
    retries: 1,
    reporter: [['html'], ['list']],
    use: {
        baseURL: process.env.BASE_URL || 'https://studio.autonomyai.io',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: true,
        browserName: 'chromium',
        viewport: { width: 1440, height: 900 },
    },
});