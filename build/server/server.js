const express = require('express')
const app = express()
const path = require('path')

app.use('/static', express.static('static'))

app.get(/.*/, (req, res) => {
    return res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(process.env.PORT || '3000', () => {
    console.log('server start')
})
