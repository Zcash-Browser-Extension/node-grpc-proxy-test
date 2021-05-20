let methods = {}

methods.helloWorld = async () => {
    var PROTO_PATH = __dirname + '/../proto/helloworld.proto';

    var parseArgs = require('minimist');
    var grpc = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');
    var packageDefinition = protoLoader.loadSync(
        PROTO_PATH,
        {keepCase: true,
         longs: String,
         enums: String,
         defaults: true,
         oneofs: true
        });
    var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
    
    const target = 'localhost:50051'
    let client = new hello_proto.Greeter(target,grpc.credentials.createInsecure());
    let user = 'world'
    let responseMsg = 'foo'
    
    //client.sayHello({name: user}, function(err, response) { console.log('Greeting:', response.message) });   
    
    /*
    let getGrpcRequest = (nameObj) => {
        return new Promise(
          (resolve, reject) => {
            client.sayHello(nameObj, function(error, response) { 
              if (error) reject(error)
              let fact = response.message
              resolve(fact)
            })
         }
       )
      };
      
      getGrpcRequest({name: user}).then(
         fact => {
             console.log(fact) // actually outputs a string
            }
      ).catch(
         error => console.log(error)
      )
    */

    return client
    /*  
    client.sayHello({name: user}, function(err, response) { 
        if(err) throw new Error("Error while fetching fetching data")
        console.log('Greeting:', response.message) 
    });
    */ 
    
 

    //console.log("hi")
    //return 5
    /*
    function main() {
      var argv = parseArgs(process.argv.slice(2), {
        string: 'target'
      });
      var target;
      if (argv.target) {
        target = argv.target;
      } else {
        target = 'localhost:50051';
      }
      var client = new hello_proto.Greeter(target,
                                           grpc.credentials.createInsecure());
      var user;
      if (argv._.length > 0) {
        user = argv._[0]; 
      } else {
        user = 'world';
      }
      client.sayHello({name: user}, function(err, response) {
        console.log('Greeting:', response.message);
      });
      client.sayHelloAgain({name: 'you'}, function(err, response) {
        console.log('Greeting:', response.message);
      });  
    }
    
    main();
    */
}

exports.data = methods