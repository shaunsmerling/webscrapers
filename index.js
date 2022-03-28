const PORT = 8000
const { default: axios } = require('axios')
const axious = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
 
const url = "https://1800d2c.pallet.com/jobs"

axios(url) 
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('a.e173li120.css-1z087tq.ekruabv0', html).each(function() { 
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({ 
                url,
                title
            })
        })
        
        console.log(articles)
         
    }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
