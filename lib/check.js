var log = require('./log').logger,
  spawn = require('child_process').spawn
  sys   = require('sys'),
  stats = {};

function initCheck(address, res) {
  checkWebsite(address, res);
}

function checkWebsite(uri, res) {
  log.info("Checking website: %s", uri);

  stats.checksInProgress = stats.checksInProgress ? stats.checksInProgress += 1 : 1;
  stats.checksStarted = stats.checksStarted ? stats.checksStarted += 1 : 1;

  var curlOptions = [ '--fail', '-silent', '--show-error', '--connect-timeout', 1, '-I', uri ],
    check = spawn('curl', curlOptions),
    checkResults = {
      stdout : null,
      stderr : null
    };

  check.stdout.on('data', function (data) {
    checkResults.stdout += data;
    //log.info('stdout: ' + data);
  });

  check.stderr.on('data', function (data) {
    //log.error('stderr: ' + data);
    checkResults.stderr += data;
  });

  check.on('close', function (code) {

    stats.checksErrored = checkResults.stderr ? ( stats.checksErrored ? stats.checksErrored += 1 : 1 ) : stats.checksErrored;

    stats.checksInProgress -= 1;
    stats.checksCompleted = stats.checksCompleted ? stats.checksCompleted += 1 : 1;
    log.info(checkResults);
    log.info('child process exited with code ' + code);
    res.end('Done!');
  });

}

function getStats(res) {
  res.end ( JSON.stringify(stats) );
}

exports.initCheck = initCheck;
exports.getStats = getStats;

