const ExcelJs = require('exceljs');
module.exports = ExcelJs;
const {test, expect} = require('@playwright/test');
const { Agent } = require('node:http');

//two ways to read contents of file
//1. add function during readFile
//2. create function at the start

async function writeExcel(searchText, replaceText, change, filePath) 
{
const workbook = new ExcelJs.Workbook(); //object
await workbook.xlsx.readFile(filePath); //.then(function()
const worksheet = workbook.getWorksheet('Sheet1'); // get the sheet/tab on the excel file to work on
const output = await readExcel(worksheet,searchText);

 //geting the specific value in a cell
const cell = worksheet.getCell(output.row+change.rowChange, output.colunn+change.colChange);
cell.value = replaceText; //update existing value in the cell
await workbook.xlsx.writeFile(filePath);  //save the changes in the file

}

async function readExcel(worksheet, searchText) 
{
    let output = {row:-1,colunn:-1}; //new global object to specfy the row and column of the cell or value
    //getting the values in the worksheet per row or column
    worksheet.eachRow((row, rowNumber) => 
        {
        row.eachCell((cell, colNumber) => 
            {
            //verify specific value in the file
            if(cell.value === searchText)
            {
                output.row = rowNumber;
                output.colunn = colNumber;
            }
            });
        }); 
    return output;   
}

test('excel test', async () => {
  const workbook = new ExcelJs.Workbook();
});


test('Upload download excel validation', async ({page})=>
{
    const textSearch = "Mango";
    const updateValue = "350";
    const filePath = "/Users/jdelcampo/Downloads/download.xlsx";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    //download  file
    const downloadFile = page.waitForEvent('download');
    await page.getByRole("button", {name: 'Download'}).click();
    await downloadFile;
    //update file
    await writeExcel(textSearch, updateValue, {rowChange:0, colChange:2}, filePath); 
    //upload updated file
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    //find specific value in the tanle of the page (via rows or columns)
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
})  

