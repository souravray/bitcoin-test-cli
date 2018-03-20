const program = require('commander');
const bitcoin = require('bitcoin');

program
  .version('0.0.1')
  .option('-h, --host <host>', 'provide a host name',  '127.0.0.1')
  .option('-p, --port <port>', 'prvide a port', '8332')
  .option('-U, --user <user>', 'provide user name')
  .option('-P, --pass <pass>', 'provide password')
  .option('-t, --timeout <timeout>', 'provide timeout', 30000)
  .parse(process.argv);

console.log('connecting to your node at-  '+ program.host +':'+ program.port + '\n.....\n\n');

// all config options are optional
const client = new bitcoin.Client({
  host: program.host,
  port: program.port,
  user: program.user,
  pass: program.pass,
  timeout: program.timeout
});

var batch = [];
for (var i = 0; i < 5; ++i) {
  batch.push({
    method: 'getnewaddress',
    params: ['myaccount']
  });
}

client.cmd(batch, function(err, address, resHeaders) {
  if (err) return console.log(err);
  console.log('Address:', address);
});