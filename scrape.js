const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth())

const info = []
async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'})

    //looking for title
    //wait for xpath
    await page.waitForXPath('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/a/div[1]/div/div[2]/div[1]/div')
    const [el] = await page.$x('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/a/div[1]/div/div[2]/div[1]/div')

    const txt = await el.getProperty('textContent')
    const title = await txt.jsonValue()

    //looking for company
    //wait for xpath
    await page.waitForXPath('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/a/div[1]/div/div[2]/div[2]/a/div/div/div')
    const [el1] = await page.$x('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/a/div[1]/div/div[2]/div[2]/a/div/div/div')

    const txt1 = await el1.getProperty('textContent')
    const company = await txt1.jsonValue()

    //looking for country
    //wait for xpath
    await page.waitForXPath('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/a/div[1]/div/div[2]/div[2]/div/div[1]/div[2]/div')
    const [el2] = await page.$x('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/a/div[1]/div/div[2]/div[2]/div/div[1]/div[2]/div')

    const txt2 = await el2.getProperty('textContent')
    const country = await txt2.jsonValue()

    //next company title
    //wait for xpath
    await page.waitForXPath('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[2]/div/a/div[1]/div/div[2]/div[1]/div')    
    const [el3] = await page.$x('//*[@id="__next"]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/div[2]/div/a/div[1]/div/div[2]/div[1]/div')
    const txt3 = await el3.getProperty('textContent')
    const secondTitle = await txt3.jsonValue()

    

    info.push({title, company, country, secondTitle})

    console.log(info)
    
    browser.close();
}

scrapeProduct('https://1800d2c.pallet.com/jobs') 