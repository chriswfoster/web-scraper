const puppeteer = require("puppeteer")
const fs = require("fs")


const writeToFile = (data) => {
    fs.writeFileSync('./data.json', JSON.stringify(data), err => { // writestream is a constant data flow, writefile is once.
        if (err) return console.error(err);
        process.exit() // process object is your node instance. Can also be used top pipe to console
    })
} 

// scraping is always asynchronous. 
(async() => { 
const browser = await puppeteer.launch({headless: false})
const page = await browser.newPage() // sort of like opening up a new tab.
await page.goto('https://en.wikipedia.org/wiki/Main_Page')
})()
//  ^^^^  this is called an immediately invoked expression. As soon as file loads, it fires off immediately. The same is creating a function, then following it with an invocation. 