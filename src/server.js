const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
const app = express()

app.get('/', (request, response)=>{

    const filePath = path.join(__dirname,"printPDF.ejs")
   
    ejs.renderFile(filePath,{},(err,html)=>{
        if(err){
            return response.send('Erro na leitura do arquivo') 
        }
        
        return response.send(html) 

        
    })
})

app.get('/pdf',async (request, response)=>{

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/',{
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter',
        margin: {
            top: '20px',
            bottom: '40px',
            left: '20px',
            right: '20px'
        }
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)
})


app.listen(3000)