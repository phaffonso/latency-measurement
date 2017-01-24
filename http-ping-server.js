var express = require('express')
var app = express()

var program = require('commander');

program
  .version('0.1')
  .option('-p, --port [number]', 'Port to listen on [3000]', 3000)
  .option('-r, --route [path]', 'Path to ping service [/ping]', '/ping')
  .parse(process.argv);

app.get(program.route, function (req, res) {
  res.send('pong')
})

app.listen(program.port, function () {
  console.log('Ping server listening on route %s port %s', program.route, program.port);
})
