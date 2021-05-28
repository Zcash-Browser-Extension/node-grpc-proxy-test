# node-grpc-proxy-test

POTENTIAL list of grpc calls on lightwalletd (pulled from call listing all available methods on the public lightwalletd instance - grpcurl mainnet.lightwalletd.com:9067 list cash.z.wallet.sdk.rpc.CompactTxStreamer)
* [GetAddressUtxos](https://zcash-rpc.github.io/getaddressutxos.html)
* GetAddressUtxosStream
* [GetBlock](https://zcash-rpc.github.io/getblock.html)
* GetBlockRange
* GetLatestBlock
* GetLightdInfo
* GetMempoolTx
* GetTaddressBalance
* GetTaddressBalanceStream
* GetTaddressTxids
* [GetTransaction](https://zcash-rpc.github.io/gettransaction.html)
* GetTreeState
* [Ping](https://zcash-rpc.github.io/ping.html)
* SendTransaction

# research
https://grpc.io/docs/languages/node/quickstart/
https://www.youtube.com/watch?v=VLXAzzRjQws&list=PLTjRvDozrdlydy3uUBWZlLUTNpJSGGCEm&index=13
https://nodejs.org/en/knowledge/getting-started/what-is-require/
https://www.freecodecamp.org/news/require-module-in-node-js-everything-about-module-require-ccccd3ad383/
https://github.com/adityapk00/zecwallet-light-cli/blob/4a279179f885e9867809ba4bdc037dcfbd9c31aa/lib/proto/service.proto

# grpcurl example call
        SERVER                        SERVICE                                 METHOD
grpcurl mainnet.lightwalletd.com:9067 cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo

# envoy links
* [Get Envoy server running locally](https://github.com/adityapk00/zecwallet-lite/tree/wasm#run-envoy-proxy-locally)
* [Envoy YAML file](https://github.com/adityapk00/zecwallet-lite/blob/wasm/envoy/envoy.yaml)
* [Bridge to make calls to Envoy server from extension JS](https://github.com/adityapk00/zecwallet-lite/blob/wasm/app/wasm/wasmbridge.js)
* [Stub file for the JS side to import](https://github.com/adityapk00/zecwallet-lite/blob/wasm/app/grpc/service_grpc_web_pb.js)
* [Note docker instances can't use localhost on OSX](https://runnable.com/docker/install-docker-on-macos)

# to do
* Need to limit to https

# to run
To start node server: npm run dev
To start grpc test server: in code/node-grpc-server-test run node greeter_server.js
Use body-parser to parse post requests