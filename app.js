const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.send('Successful response.');
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
