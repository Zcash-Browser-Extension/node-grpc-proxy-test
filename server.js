//const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const helloWorld = require('./grpc_calls/hello_world.js')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        let sum = helloWorld.data.sumNumbers(2,3)
        res.write(sum.toString())
        res.end()
    }
})

server.listen(8000)

console.log('Listening on port 8000...')