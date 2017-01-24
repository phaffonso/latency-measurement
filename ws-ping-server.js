var program = require('commander');

program
  .version('0.1')
  .option('-p, --port [number]', 'Number of HTTP requests [100]', 8080)
  .option('-r, --route [path]', 'Path to ping service [/ping]', '/ping')
  .parse(process.argv);

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: program.port, path: program.route});
wss.on('connection', function(ws) {
    console.log('connection established');
    ws.on('message', function(message) {
        if(message == 'ping'){
          ws.send('pong');
        }
    });
});
