var messages = require('./proto/helloworld_pb');
var services = require('./proto/helloworld_grpc_pb');

var grpc = require('grpc');
var parseArgs = require('minimist');

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50053';
  }
  var client = new services.GreeterClient(target,
                                          grpc.credentials.createInsecure());
  var request = new messages.HelloRequest();
  var user;
  if (argv._.length > 0) {
    user = argv._[0]; 
  } else {
    user = 'world';
  }
  request.setName(user);
  client.sayHello(request, function(err, response) {
    console.log('Greeting:', response.getMessage());
  });
}

main();