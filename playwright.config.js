// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
 const config = ({                            // here congif is const varable which holds all the options mentioned under braces
  testDir: './tests',
  timeout : 80000,// this timeout uses for every step
  expect:
  {
    timeout :80000 // Using expect we can set timeout for assertions
  },
     reporter :"html",  // generate html report after execution
  
      use: { 
        browserName :'chromium', // we are chromium browser
        headless : true, 
        screenshot   : "on",
        trace : "on"
      //trace : "retain-on-failure"
        
   },
});
module.exports = config; // we can export config variable it will be avaiable across the project

