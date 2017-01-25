var request = require('request');
var stopwatch = new (require('./stopwatch'))();
var program = require('commander');

program
  .version('0.1')
  .option('-c, --count [number]', 'Number of HTTP requests [100]', 100)
  .option('-u, --url [addr]', 'URL to ping server [http://localhost:3000/ping]', 'http://localhost:3000/ping')
  .parse(process.argv);

var count = program.count;
var url = program.url;

function callback(error, response, body) {
  if (!error && response.statusCode == 200 && body == 'pong') {
    count -= 1;
    stopwatch.tic();
    if(count % 10 == 0){
      console.log(count);
    }
    if(count > 0){
      request(url, callback);
    }else{
      console.log(stopwatch.stats());
    }
  }else{
    console.error('There was an error processing the HTTP request');
    if(error)
      throw error;
    else
      console.error("Returned HTTP code %d: %s", response.statusCode, body);
  }
}

stopwatch.tic();
request(url, callback);
