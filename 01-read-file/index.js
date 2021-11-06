const path = require('path');
const fs = require('fs')

let writePath = path.join(__dirname, 'text.txt')
let stream = fs.createReadStream(writePath)

stream.on('data', (chunk) => {
    console.log(chunk.toString())
})

