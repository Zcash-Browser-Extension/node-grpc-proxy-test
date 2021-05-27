let methods = {}

methods.CompactTxStreamer = function () {
    const PROTO_PATH = __dirname + '/../proto/service.proto'

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
    const lightwalletd_proto = grpc.loadPackageDefinition(packageDefinition).cash.z.wallet.sdk.rpc
        
    //const target = 'localhosr:9067'
    //let client = new lightwalletd_proto.CompactTxStreamer(target,grpc.credentials.createInsecure())
    
    const target = 'mainnet.lightwalletd.com:9067'
    let client = new lightwalletd_proto.CompactTxStreamer(target,grpc.credentials.createSsl())

    //https://stackoverflow.com/questions/44058867/node-js-client-for-grpc-server#44086657


    return client
}

exports.data = methods