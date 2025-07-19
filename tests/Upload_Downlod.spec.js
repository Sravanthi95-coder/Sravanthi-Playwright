const ExcelJs = require('exceljs');
const {test,expect} = require('playwright/test');

async function WriteExcelTest(searchText,replaceText,Change,filePath)   // Write excel function
{
   
  const workBook = new ExcelJs.Workbook();
  await workBook.xlsx.readFile(filePath);
  const workSheet = workBook.getWorksheet('Sheet1');
  const output=await readExcel(workSheet,searchText);
  
   if (output.row > 0 && output.column > 0) // validate row column where we got from readExcel function
  {
   const cell = workSheet.getCell(output.row,output.column+Change.colChange); // 3rd row, 2nd element will be retrieved, i.e Apple
   cell.value = replaceText; // replace that cell value with Iphone
   await workBook.xlsx.writeFile(filePath);
  }
  else
 {
    console.log('Search text "${searchText}" not found in the worksheet.');
 } 
 
}
async function readExcel(workSheet,searchText) // Read Excel function
{
    let output ={row:-1,column:-1} ;
     workSheet.eachRow((row, rowNumber) =>   // Iterate through all the rows
   {

         row.eachCell((cell, colNumber) =>  // iterate through all the columns
         {
            if(cell.value===searchText)    // findout co-ordinates of apple
            {
                console.log(rowNumber);   // print row number that apple present
                console.log(colNumber);   // print column number that apple present
                output.row=rowNumber;     // get row number
                output.column=colNumber;  // get column number
            }   

         })
   });
   return output;
}
/* chnage mango price to 350, price column 2 columns far from mango, so we need to move columns to reach price
 Identify mango first after that we have to traverse column by 2 to reach price column and replace the text that we mentioned as replaceText */
//WriteExcelTest("Mango","350",{rowChange:0,colChange:2},"C:/Users/ratna/Downloads/download.xlsx");

test('Upload_Download_Excel_Validations',async({page})=>
{

    const searchText = 'Mango';
    const updateValue = '2000';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/"); // go to site
    // wait for the event to happen
    const downloadPromise =page.waitForEvent('download'); // wait for the event downlaod, to fully loaded page,after that you can click on download button
    await page.getByRole('button',{name:'Download'}).click(); // Click on download button
    // wait for the event to complete
    await downloadPromise;
    WriteExcelTest(searchText,updateValue,{rowChange:0,colChange:2},"C:/Users/ratna/Downloads/download.xlsx");// Modify using this JS code
    await page.locator("#fileinput").click(); // Click on upload button, to upload modified file
    // upload file, here setFileInputFiles upload the exact file what we mentioned as a path
    await page.locator('#fileinput').setInputFiles("C:/Users/ratna/Downloads/download.xlsx");
    //Assertions
    const textLocator = page.getByText(searchText);//Here searchText means mango, we made it as dynamic
    //console.log(textLocator);
    const desiredRow= page.getByRole('row').filter({has:textLocator}); // in which row you find textlocator just give me that row only
   await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
    

    

})
