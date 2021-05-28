const express = require('express')
const bodyParser = require('body-parser')
const CompactTxStreamer = require('./grpc_calls/CompactTxStreamer.js')

const app = express()

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const methodWhitelist = ['GetBlock','GetLightdInfo']

app.post('/', jsonParser, function (req, res) {
    if (methodWhitelist.includes(req.body.method)) {
        const client = CompactTxStreamer.data.CompactTxStreamer()
        client[req.body.method](req.body.params, function(err, response) { 
            if(err) {
                console.log("Error while fetching data")
                console.log(err)
                res.status(500).send('Call error')
            }
            res.status(200).json(response)
        })        
    } else {
        res.status(400).send('Bad call')
    }
});

app.listen(8000, () => console.log('Example app is listening on port 8000.'));

/*
const http = require('http')
const bodyParser = require('body-parser')
const helloWorld = require('./grpc_calls/hello_world_grpc_test.js')
const CompactTxStreamer = require('./grpc_calls/CompactTxStreamer.js')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        console.log(req)
        let parsedResponse = JSON.stringify("placeholder")
        res.setHeader('Content-Type', 'application/json')
        res.end(parsedResponse)
        const client = helloWorld.data.helloWorld()
        client.sayHello({name: 'Ronnie'}, function(err, response) { 
            if(err) throw new Error("Error while fetching fetching data")
            res.write(JSON.stringify(response.message))
            res.end()
        }) 
    } else if (req.url === '/getLightdInfo') {
        const client = CompactTxStreamer.data.CompactTxStreamer()
        client['GetLightdInfo']({}, function(err, response) { 
            if(err) {
                console.log("Error while fetching data")
                console.log(err)
            }
            let parsedResponse = JSON.stringify(response)
            res.setHeader('Content-Type', 'application/json')
            res.end(parsedResponse)
        })
    }
})

server.listen(8000)

console.log('Listening on port 8000...')
*/
