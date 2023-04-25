const commander = require('commander')
const exec = require('child_process').exec

commander
  .option('-i, --instances <item>', 'number of instances to spawn')
  .parse(process.argv)

const options = commander.opts()

exec(`env instances=${options.instances} make down docker.build`)

console.log('docker startintg... you can monitor them with make docker.logs')