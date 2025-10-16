// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
 const config = ({                            // here congif is const varable which holds all the options mentioned under braces
  testDir: './tests',
  retries:1,
  timeout : 80000,// this timeout uses for every step
  expect:
  {
    timeout :80000 // Using expect we can set timeout for assertions
  },
    // reporter :"html",  // generate html report after execution
    reporter: [['html', { outputFolder: 'playwright-report' }]],
  
    use: { 
        
      // ...devices['iPhone 11'],
        headless: false,
        screenshot: 'on', // screenshots
        trace: 'on', // traces
        ignoreHTTPSErrors: true,
        permissions:['geolocation'],
        video: 'retain-on-failure', // video capture
        browserName: 'chromium', // we are chromium browser



      
   },


});
module.exports = config; // we can export config variable it will be avaiable across the project

