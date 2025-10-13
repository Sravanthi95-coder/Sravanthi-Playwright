const base  = require('playwright/test');
exports.customtest = base.test.extend(
    {
        testDataForOrder:
        {

            username: "sravanthich2021@gmail.com",
            password: "Myfirstjob@2021",
            productName: "ADIDAS ORIGINAL"
        }
    }

)