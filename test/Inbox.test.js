require('events').EventEmitter.defaultMaxListeners = 0; //suppress listener leak warning
const assert = require('assert');
const ganache = require('ganache-cli'); //local network provider
const Web3 = require('web3'); //constructor
const web3 = new Web3(ganache.provider()); //instance - pass ganache local eth network
//web 3 functions are async in nature and return a promise
const {
  interface, // methods
  bytecode // code to be deployed
} = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Initial Message';
const NEW_MESSAGE = 'Bye Bye';

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts(); //access eth module and get accounts
  //Use one of those accounts to deploy contract

  //tell web3 we have a contract with the following this interface
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING] //constructor
    })
    .send({
      //send out the transaction that creates this contract
      from: accounts[0], //select account
      gas: '1000000' //set gas limit
    });
});

describe('Inbox', () => {
  //TEST 1 make sure message is initialized with a default value
  it('has a default message', async () => {
    //call is used for read only call 
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  //TEST 2 make sure message is set with our own message
  it('can change the message', async () => {
    //send is used to change the data which returns a txn hash
    await inbox.methods.setMessage(NEW_MESSAGE).send({
      from: accounts[0] //this account will pay for the gas
    });
    const message = await inbox.methods.message().call();
    assert.equal(message, NEW_MESSAGE);
  });
  //TEST 3 make sure we can successfully deploy our contract (inbox is assigned an address)
  it('deploys a contract', () => {
    assert.ok(inbox.options.address); //if inbox.options.address is not null/undefined then success
  });
});

//providers:
// websocket, http, ipc(when test network is same as local machine)
//methods:
//function in our contract that we can interat with
//options:
//contains address, gasprice, and gas