let methods = {}

methods.getLightdInfo = function () {
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
    
    const target = 'mainnet.lightwalletd.com:9067'
    let client = new lightwalletd_proto.CompactTxStreamer(target,grpc.credentials.createInsecure())

    return client
}

exports.data = methods