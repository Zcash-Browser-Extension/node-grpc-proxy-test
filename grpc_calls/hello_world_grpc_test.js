let methods = {}

methods.helloWorld = function () {
    const PROTO_PATH = __dirname + '/../proto/helloworld.proto'

    //var parseArgs = require('minimist')
    const grpc = require('@grpc/grpc-js')
    const protoLoader = require('@grpc/proto-loader')
    const packageDefinition = protoLoader.loadSync(
        PROTO_PATH,
        {keepCase: true,
         longs: String,
         enums: String,
         defaults: true,
         oneofs: true
        });
    const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld
    
    const target = 'localhost:50051'
    let client = new hello_proto.Greeter(target,grpc.credentials.createInsecure())

    return client
}

exports.data = methods