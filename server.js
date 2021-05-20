const http = require('http')
const bodyParser = require('body-parser')
//const helloWorld = require('./grpc_calls/hello_world_require_test.js')
const helloWorld = require('./grpc_calls/hello_world_grpc_test.js')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        helloWorld.data.helloWorld().then((value) => {
            res.write(value.toString())
            res.end()
        })
    }
})

server.listen(8000)

console.log('Listening on port 8000...')