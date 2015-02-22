var express = require('express'),
  app       = express(),
  check     = require('./lib/check'),
  log       = require('./lib/log').logger,
  workload  = require('./lib/check').workload;

app.get('/check', function (req, res) {
  var address = req.query.address;
  check.initCheck(address, res);
});

app.get('/stats', function (req, res) {
  check.getStats(res);
});

var server = app.listen(3000, function () {
  var host = server.address().address,
    port   = server.address().port;

  log.info('Server listening at http://%s:%d', host, port);
});