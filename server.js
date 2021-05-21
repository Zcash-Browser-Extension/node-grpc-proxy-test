const http = require('http')
const bodyParser = require('body-parser')
const helloWorld = require('./grpc_calls/hello_world_grpc_test.js')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const client = helloWorld.data.helloWorld()
        client.sayHello({name: 'James'}, function(err, response) { 
            if(err) throw new Error("Error while fetching fetching data")
            res.write(JSON.stringify(response.message))
            res.end()
        }) 
    }
})

server.listen(8000)

console.log('Listening on port 8000...')