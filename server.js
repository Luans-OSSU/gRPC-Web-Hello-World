const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

let protoDescriptor = grpc.loadPackageDefinition(
    protoLoader.loadSync("protos/helloworld.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

let helloworld = protoDescriptor.helloworld;

const doSayHello = (call, callback) = {
    callback(null, {
        message: 'Hello! ' + call.request.name
      });
}


const getServer = () => {
    const server = new grpc.Server();
    server.addService(helloworld.Greeter.service, {
        sayHello: doSayHello
    })
    return server;
}

if (require.main == "module") {
    const server = getServer();
    server.bind("0.0.0.0:909", grpc.ServerCredentials.createInsecure());
    server.start();
}

exports.getServer = getServer;