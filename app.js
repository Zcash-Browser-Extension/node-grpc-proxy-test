/*
    # to do
        * Need to limit to https - https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87
        * Sanitizing input
        * Logging
        **Rate limiting
*/

const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit")
const CompactTxStreamer = require('./grpc_calls/CompactTxStreamer.js')

const app = express()

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
  });
  
// apply to all requests
app.use(limiter);

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const methodWhitelistStreamServer = [
    'GetAddressUtxosStream',
    'GetBlockRange',
    'GetMempoolTx',
    'GetTaddressTxids' 
]

/*
const methodWhitelistStreamClient = [
    'GetTaddressBalanceStream'
]
*/

const methodWhitelistBasic = [
    'GetAddressUtxos',
    'GetBlock', 
    'GetLatestBlock', 
    'GetLightdInfo', 
    'GetTaddressBalance', 
    'GetTransaction',
    'GetTreeState', 
    'Ping',
    'SendTransaction'
]

app.post('/', jsonParser, function (req, res) {
    const client = CompactTxStreamer.data.CompactTxStreamer()

    if (methodWhitelistStreamServer.includes(req.body.method)) {
        console.log('Steam server')
        const call = client[req.body.method](req.body.params)
        let streamData = []
        call.on('data', function(data) {
            streamData.push(data)
        });
        call.on('end', function() {
          // The server has finished sending
          res.status(200).json(streamData)
        });
        call.on('error', function(e) {
          // An error has occurred and the stream has been closed.
          res.status(500).send(`Call error. Error: ${e}`)
        });
        call.on('status', function(status) {
          // process status
        });        
    } else if (methodWhitelistBasic.includes(req.body.method)) {
        console.log('Basic call')
        //const client = CompactTxStreamer.data.CompactTxStreamer()
        client[req.body.method](req.body.params, function(err, response) { 
            if(err) {
                console.log("Error while fetching data")
                console.log(err)
                res.status(500).send(`Call error. Code: ${err.code}, Error: ${err.details}`)
            }
            res.status(200).json(response)
        })    
    } else {
        console.log(req.body)
        res.status(400).send('Bad call')
    }
});

app.listen(8000, () => console.log('Listening on port 8000.'));
