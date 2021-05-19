//const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello world (from server)')
        res.end()
    }
})

server.listen(8000)

console.log('Listening on port 8000...')