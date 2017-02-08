import Web3 from 'web3';

var web3 = new Web3();

// Connect to local ethereum test node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

export default web3;
