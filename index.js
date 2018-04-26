const puppeteer = require("puppeteer")
const fs = require("fs")

const sleep = require(`${__dirname}/utils`)

const writeToFile = data => {
  fs.writeFileSync("./data.json", JSON.stringify(data), err => {
    // writestream is a constant data flow, writefile is once.
    if (err) return console.error(err)
    process.exit() // process object is your node instance. Can also be used top pipe to console
  })
}

// scraping is always asynchronous.
;(async () => {
  const data = []
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage() // sort of like opening up a new tab.
  await page.goto("https://en.wikipedia.org/wiki/Main_Page")
  await sleep(page, 60000)
  //can't use .map, for each, etc. They're not blocking and can't access this data. So use regular for loop
  for (let i = 0; i < 10; i++) {
    await page.click("#n-randompage") //targets element's id and clicks it.
    const paragraphs = await page.$$("#content p")
    for (let j = 0; j < paragraphs.length; j++) {
      data.push({
        p: await (await paragraphs[j].getProperty("innerText")).jsonValue()
      })
    }
  }
  writeToFile(data)
})()
//  ^^^^  this is called an immediately invoked expression. As soon as file loads, it fires off immediately. The same is creating a function, then following it with an invocation.
