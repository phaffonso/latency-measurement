
var program = require('commander');

program
  .version('0.1')
  .option('-c, --count [number]', 'Number of ping messages [100]', 100)
  .option('-u, --url [addr]', 'URL to ping server [ws://localhost:8080/ping]', 'ws://localhost:8080/ping')
  .parse(process.argv);

var WebSocket = require('ws')
  , ws = new WebSocket(program.url);

var stopwatch = new (require('./stopwatch.js'))();

var count = program.count;

ws.on('open', function() {
    console.log('connection open');
    stopwatch.tic();
    ws.send('ping');
});
ws.on('message', function(message) {
    if(message == 'pong'){
      count -= 1;
      stopwatch.tic();
      if(count % 10 == 0){
        console.log(count);
      }
      if(count == 0){
        console.log(stopwatch.stats());
        ws.close();
      }else{
        ws.send('ping');
      }
    }
});
