require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fs = require('fs');
const fetch = require('node-fetch')
const path = require('path')

if (!globalThis.fetch) {
    globalThis.fetch = fetch
}
const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
//app.use('/api')
async function parsFile(data) {
    try {
        const parseFile =  JSON.parse(data);
        return newFormat(parseFile)
    } catch (error) {
        console.log('error', error)
    }
}
async function newFormat(parseFile) {
    try {
        const result = []
        const length = parseFile.length ?? parseFile.RESPONSE.length
        for (let i =  0; i < length; i++){
            const data =  parseFile[i]?.offers ? parseFile[i].offers[0] : null ?? parseFile.RESPONSE ? parseFile.RESPONSE[i] : null
                ?? parseFile[i]
            const form = {
                provider: data.provider || data.PROVEDER ||  null,
                name: data.name || data.NAME || data.article?.name || null,
                brand: data.brand || data.BRAND || data.article?.tradeMarkName,
                in_stock: data.in_stock || data.IN_STOCK ||  data.prices?.at(0, 0).quantity.available || null,
                price: {
                    type: data.price || data.PRICE || data.prices?.at(0, 0).price.value
                },
                additional_info: data.additional_info || data.ADDITIONAL_INFO ||  data.prices?.at(0, 0).addInfo || null,
                articul: {
                    type: data.articul || data.ARTICUL || data.prices?.at(0, 0).articleId || null,
                }
            }
            console.log(form)
            result.push(form)
        }
    } catch (error) {
        console.log('error', error)
    }
}

fs.readFile('file/4.txt', 'utf8',  async (error, data) => {
     try {
         if (error) throw error;
         await parsFile(data)
     } catch (err4) {
         console.log('err4', err4)
     }
})
fs.readFile('file/first.txt', 'utf8',  async (error, data) => {
     try {
         if (error) throw error;
         await parsFile(data)
     } catch (errFirst) {
         console.log('errFirst', errFirst)
     }
})
fs.readFile('file/second.txt', 'utf8',  async (error, data) => {
     try {
         if (error) throw error;
          await parsFile(data)
     } catch (errSecond) {
         console.log('errSecond', errSecond)
     }
})

const start = async () => {
    try {
        app.listen(process.env.PORT, () => console.log(`Server start ${PORT}`))
    }catch (err) {
        console.log('err', err)
    }
}
start()
