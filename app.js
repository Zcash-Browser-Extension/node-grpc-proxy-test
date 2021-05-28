/*
    # to do
        * Need to limit to https - https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87
        * Logging
        * Rate limiting
*/

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

app.listen(8000, () => console.log('Listening on port 8000.'));
