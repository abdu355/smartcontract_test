const path = require('path');
const fs = require('fs');
const solc = require('solc');
// inbox root dir -> find contracts -> find Inbox.sol
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//syncronous file read
const source = fs.readFileSync(inboxPath, 'utf8');

//tell solidity compiler to compile the source file defined above
//then export  contracts-> :Inbox
module.exports = solc.compile(source, 1).contracts[':Inbox'];