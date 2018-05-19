const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {
  interface,
  bytecode
} = require('./compile');
const keys = require('./config/keys')

const ACCOUNT_MNEMONIC = keys.accountMnemonic
const INFURA_API_URL = keys.infuraAPIURL

//connect to our wallet on Rinkeby network
const provider = new HDWalletProvider(
  //rinkeby account mnemonic used to unlock our account, generates : public key, private key, & address
  ACCOUNT_MNEMONIC,
  //infura API URL + API key :
  //sets up a node for us to use and deploy on. This node is connected to the Rinkeby network
  INFURA_API_URL
);

const web3 = new Web3(provider); //web3 instance configured for use with Rinkeby

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: '0x' + bytecode,
      arguments: ['Hi there 222']
    })
    .send({
      gas: '1000000',
      gasPrice: web3.utils.toWei('2', 'gwei'),
      from: accounts[0]
    });
  console.log('Contract deployed to: ', result.options.address);
};
deploy();