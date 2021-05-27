const http = require('http')
const bodyParser = require('body-parser')
const helloWorld = require('./grpc_calls/hello_world_grpc_test.js')
const getLightdInfo = require('./grpc_calls/getLightdInfo.js')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const client = helloWorld.data.helloWorld()
        client.sayHello({name: 'Ronnie'}, function(err, response) { 
            if(err) throw new Error("Error while fetching fetching data")
            res.write(JSON.stringify(response.message))
            res.end()
        }) 
    } else if (req.url === '/getLightdInfo') {
        const client = getLightdInfo.data.getLightdInfo()
        client.GetLightdInfo({}, function(err, response) { 
            if(err) console.log("Error while fetching fetching data")
            console.log(response)
            let parsedResponse = JSON.stringify(response)
            res.setHeader('Content-Type', 'application/json')
            res.end(parsedResponse)
        })
    }
})

server.listen(8000)

console.log('Listening on port 8000...')